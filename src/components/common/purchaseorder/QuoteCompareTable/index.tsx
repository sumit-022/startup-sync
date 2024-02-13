import styles from "./QuoteComparision.module.css";

export type DeliveryTime = {
  value: number;
  unit: "D" | "W" | "M" | "Y";
};

export default function QuoteCompareTable<
  S extends string[],
  C extends string[],
  A extends string[]
>({
  spareCols,
  companyCols,
  spares,
  companies,
  aggregateCols,
  aggregate,
  onChange,
}: {
  spareCols: S;
  companyCols: C;
  aggregateCols: A;
  spares: ({
    [x in S[number]]: string;
  } & { name: string })[];
  companies: ({
    [s in (typeof spares)[number]["name"]]: ({ [x in C[number]]: string } & {
      selected: boolean;
      total: number;
    });
  } & {
    name: string;
  })[];
  aggregate: {
    [company in (typeof companies)[number]["name"]]: {
      [x in A[number]]: string;
    };
  };
  onChange?: (c: typeof companies) => void;
}) {
  // Calculate the least total
  const totals = Object.fromEntries(
    companies.map((company) => [
      company.name,
      (() => {
        const { name, ...s } = company;
        return Object.keys(s).reduce((acc, cur) => {
          const spare = company[cur as (typeof spares)[number]["name"]];
          return acc + spare.total;
        }, 0);
      })(),
    ])
  ) as { [x in (typeof companies)[number]["name"]]: number };

  const sortedTotals = (Object.entries(totals) as [string, number][]).sort(
    ([, a], [, b]) => a - b
  ) as [string, number][];

  const minCompanyForEachSpare = spares.map((spare) => {
    const spareName = spare.name as (typeof spares)[number]["name"];
    const min = companies.reduce(
      (acc, cur) => {
        const spareData = cur[spareName];
        if (spareData.total < acc.total) {
          return {
            name: cur.name,
            total: spareData.total,
            spareName,
          };
        }
        return acc;
      },
      { name: "", total: Infinity, spareName: "" }
    );
    return min;
  });

  console.log({ minCompanyForEachSpare });

  return (
    <table className={styles["quote-comparison-table"]}>
      {/* 1st row */}
      <tr>
        <th colSpan={spareCols.length + 2}></th>
        {/* Company names */}
        {companies.map((company, idx) => (
          <th colSpan={companyCols.length + 2} key={idx}>
            {company.name}
          </th>
        ))}
      </tr>

      {/* 2nd row */}
      <tr>
        <th rowSpan={2}>No.</th>
        <th rowSpan={2}>Item</th>
        {spareCols.map((col, idx) => (
          <th key={idx} rowSpan={2}>
            {col}
          </th>
        ))}
        {companies.map((company, idx) => (
          <th key={idx} colSpan={companyCols.length + 2}>
            1 USD = 1.0 USD
          </th>
        ))}
      </tr>

      {/* 3rd row */}
      <tr>
        {companies.map((company, idx) => (
          <>
            {companyCols.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
            <th>Total</th>
            <th>
              Order{" "}
              <input
                type="checkbox"
                name=""
                id=""
                checked={(() => {
                  const { name, ...s } = company;
                  return (
                    Object.keys(s) as (typeof spares)[number]["name"][]
                  ).reduce((acc, cur) => acc && company[cur].selected, true);
                })()}
                onChange={(ev) => {
                  const selected = ev.target.checked;
                  const { name, ...s } = company;
                  (Object.keys(s) as (typeof spares)[number]["name"][]).forEach(
                    (key) => {
                      company[key].selected = selected;
                    }
                  );

                  onChange?.([...companies]);
                }}
              />
            </th>
          </>
        ))}
      </tr>

      {/* Spare rows */}
      {spares.map((spare, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{spare.name}</td>
          {spareCols.map((col, i) => (
            <td key={i}>{spare[col as S[number]]}</td>
          ))}
          {companies.map((company, idx) => {
            const spareName = spare.name as (typeof spares)[number]["name"];
            const spareData = company[spareName];
            return (
              <>
                {companyCols.map((col, i) => {
                  return (
                    <td
                      key={i}
                      className={`${
                        spareData.selected ? styles.selected : ""
                      } ${
                        minCompanyForEachSpare.find(
                          (min) =>
                            min.name === company.name &&
                            min.spareName === spareName
                        )
                          ? styles.highligted
                          : ""
                      }`}
                    >
                      {spareData[col as C[number]]}
                    </td>
                  );
                })}
                <td
                  className={`${styles.number} ${
                    spareData.selected ? styles.selected : ""
                  } ${
                    minCompanyForEachSpare.find(
                      (min) =>
                        min.name === company.name && min.spareName === spareName
                    )
                      ? styles.highligted
                      : ""
                  }`}
                >
                  {spareData.total}
                </td>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={spareData["selected"]}
                    onChange={(ev) => {
                      const selected = ev.target.checked;
                      spareData["selected"] = selected;
                      onChange?.([...companies]);
                    }}
                  />
                </td>
              </>
            );
          })}
        </tr>
      ))}

      {/* Aggregate Rows */}
      {/* TOTAL Row First */}
      <tr>
        <td colSpan={spareCols.length + 2}>Total</td>
        {companies.map((company, idx) => {
          const companyName =
            company.name as (typeof companies)[number]["name"];
          return (
            <>
              <td></td>
              <td
                className={`${styles.number} ${
                  sortedTotals[0][0] === companyName ? styles.highligted : ""
                }`}
              >
                {totals[companyName]}
              </td>
              <td></td>
            </>
          );
        })}
      </tr>
      {aggregateCols.map((agg, idx) => (
        <tr key={idx}>
          <td colSpan={spareCols.length + 2}>{agg}</td>
          {companies.map((company, idx) => {
            const companyName =
              company.name as (typeof companies)[number]["name"];
            return (
              <>
                <td></td>
                <td className={styles.number}>
                  {aggregate[companyName][agg as A[number]]}
                </td>
                <td></td>
              </>
            );
          })}
        </tr>
      ))}
    </table>
  );
}
