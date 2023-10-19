import React from 'react'
import MyDocument from "./MyDocument";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";


function PdfDownloader({objToPdf, setIsPdf, isOlivir}) {

    const styles = StyleSheet.create({
        downloadLink: {
          textDecoration: "none",
        },
        downloadText: {
          color: "white",
        },
      });

    return (
        <div className="ml-50 mt-15">
          <button className="downloadPdf">
            <PDFDownloadLink
              document={<MyDocument isOlivir={isOlivir} objToPdf={objToPdf} />}
              fileName="stickers.pdf"
            >
              {({ blob, url, loading, error }) => (
                <div style={styles.downloadLink}>
                  {loading ? (
                    <span style={styles.downloadText}>Загрузка...</span>
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.downloadText}
                      onClick={() => {
                        setTimeout(() => setIsPdf(false), 1000);
                      }}
                    >
                      Скачать документ
                    </a>
                  )}
                </div>
              )}
            </PDFDownloadLink>
          </button>
        </div>
    )
}

export default PdfDownloader
