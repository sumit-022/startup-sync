import React from "react";
import { GetServerSideProps } from "next";
import DashboardLayout from "@/components/layout";
import { Button, Typography } from "@mui/material";
import styles from "./quotes.module.css";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  renderActionsCell,
} from "@mui/x-data-grid";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";

interface QuotationPageProps {
  rfqs: any[];
}

const QuotationPage: React.FC<QuotationPageProps> = ({ rfqs }) => {
  console.log(rfqs);

  const columns: GridColDef[] = [
    {
      field: "spareName",
      headerName: "Spare Name",
      headerAlign: "center",
      align: "center",
      width: 130,
      flex: 0.3,
    },
    {
      field: "lastName",
      headerName: "Spare Description",
      width: 130,
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "quatity",
      headerName: "Quantity",
      type: "number",
      width: 90,
      flex: 0.2,
    },
    {
      field: "vendor",
      headerName: "Selected Vendor",
      headerAlign: "center",
      align: "center",
      width: 130,
      flex: 0.3,
      renderCell: (params) => {
        return params.value;
      },
    },
  ];

  const rows = rfqs.map((rfq) => {
    return {
      id: rfq.id,
      spareName: rfq.spare?.title,
      lastName: rfq.spare?.description || "No Description",
      quatity: rfq.spare?.quantity,
      vendor: rfq.selected ? (
        rfq.selected
      ) : (
        <Button variant="outlined">Select Vendor</Button>
      ),
    };
  });

  return (
    <DashboardLayout header sidebar>
      <Typography variant="h5" textAlign="center" className={styles.title}>
        Compare Quotations
      </Typography>
      <DataGrid rows={rows} columns={columns} />
    </DashboardLayout>
  );
};

export default QuotationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rfqNumber = context.query.rfq;

  try {
    const rfqs = parseAttributes(
      (
        await instance.get(
          `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&populate=*`
        )
      ).data
    );

    if (!rfqs || rfqs.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        rfqs,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
