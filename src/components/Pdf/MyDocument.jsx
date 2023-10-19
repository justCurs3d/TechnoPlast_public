import { Document, Page, StyleSheet, Image } from "@react-pdf/renderer";
import React from "react";

function MyDocument({ objToPdf, isOlivir }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      paddingTop: 2
    },
  });

  return (
    <Document>
      {objToPdf.orders.map((order, index) => (
        <>
        <Page size={[113, 85]} style={styles.page}>
            <Image
              src={`/public/barcodes/${isOlivir ? "olivir" : "techno"}/${
                order.article
              }.jpeg`}
            />
          </Page>
          <Page size={[113, 85]} style={styles.page}>
            <Image src={`data:image/png;base64, ${order.qr}`} />
          </Page>
        </>
      ))}
      <Page size={[113, 85]} style={styles.page}>
            <Image src={`data:image/png;base64, ${objToPdf.file}`} />
          </Page>
    </Document>
  );
}

export default MyDocument;
