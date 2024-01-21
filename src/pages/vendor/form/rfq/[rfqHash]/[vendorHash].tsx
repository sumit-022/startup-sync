import instance from "@/config/axios.config";
import { decrypt } from "@/utils/crypt";
import { GetServerSideProps } from "next";

type PageProps = {
  rfqs: any[];
};

export default function RfqHash(props: PageProps) {
  return <div>{JSON.stringify(props)}</div>;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    // Get the rfq hash
    const rfqHash = context.params?.rfqHash;
    const vendorHash = context.params?.vendorHash;

    if (
      !rfqHash ||
      typeof rfqHash !== "string" ||
      !vendorHash ||
      typeof vendorHash !== "string"
    ) {
      return {
        notFound: true,
      };
    }

    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    if (!ENCRYPTION_KEY) {
      console.warn("ENCRYPTION_KEY is not set");
      return {
        notFound: true,
      };
    }

    const rfqNumber = decrypt(rfqHash, ENCRYPTION_KEY);
    const vendorId = parseInt(decrypt(vendorHash, ENCRYPTION_KEY));

    // Fetch the vendor
    const vendor = await instance.get(`/vendors/${vendorId}`);

    if (!vendor) {
      return {
        notFound: true,
      };
    }

    // Fetch the rfqs
    const rfqs = await instance.get(
      `/rfqs?publicationState=preview&filters[RFQNumber][$eq]=${rfqNumber}&filters[vendor][id][$eq]=${vendorId}`
    );

    if (!rfqs.data || rfqs.data.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        rfqs: rfqs.data,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
    return {
      notFound: true,
    };
  }
};
