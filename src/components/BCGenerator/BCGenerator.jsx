import { useState } from "react";
import "./BCGenerator.css";
import axios from "axios";
import MyModal from "../MyModal/MyModal";
import Toogle from "../Toggle/Toggle";
import PdfDownloader from "../Pdf/PdfDownloader";

function BCGenerator() {
  const [supplyId, setSupplyId] = useState("");
  const [isPdf, setIsPdf] = useState(false);
  const [objToPdf, setObjToPdf] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOlivir, setIsOlivir] = useState(false);

  const fetchAndGeneratePdf = async () => {
    const regex = /WB-GI-\d{8,}/;
    const API_KEY = ''
    if (regex.test(supplyId)) {
      setIsLoading(true);
      try {
        const ordersResponse = await axios.get(
          `https://suppliers-api.wildberries.ru/api/v3/supplies/${supplyId}/orders`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        const orders = ordersResponse.data.orders;
        const qrsResponse = await axios.post(
          "https://suppliers-api.wildberries.ru/api/v3/orders/stickers?type=png&width=58&height=40",
          {
            orders: orders.map((e) => {
              return e.id;
            }),
          },
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        const qrs = qrsResponse.data.stickers;
        const resultOrders = [];
        orders.forEach((order) => {
          qrs.forEach((qr) => {
            if (order.id === qr.orderId) {
              resultOrders.push({
                id: order.id,
                article: order.article,
                qr: qr.file,
                partA: qr.partA,
                partB: qr.partB,
              });
            }
          });
        });
        resultOrders.sort((a, b) => a.article - b.article);
        try {
          const mainQrResponse = await axios.get(
            `https://suppliers-api.wildberries.ru/api/v3/supplies/${supplyId}/barcode?type=png`,
            {
              headers: {
                Authorization: API_KEY,
              },
            }
          );
          setObjToPdf({
            orders: resultOrders,
            file: mainQrResponse.data.file,
          })
          setTimeout(() => {
            setIsPdf(true);
          }, 500);
        } catch (error) {
          alert("Поставка не передана в доставку");
        }
      } catch (error) {
        alert('Ошибка! Неверный запрос!');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Ошибка! Неверный формат.");
    }
  };

  return (
    <div className="wrapper">
      <h1 className="ml-20">Сборка поставки</h1>
      <Toogle isOlivir={isOlivir} setIsOlivir={setIsOlivir} />

      <div className="clear inputId mt-40 ml-50 mb-15">
        <input
          onChange={(e) => setSupplyId(e.target.value)}
          type="text"
          placeholder="Введите Id поставки..."
        />
      </div>

      <button onClick={fetchAndGeneratePdf} className="ml-50 genBtn">
        Сгенерировать PDF-файл
      </button>

      {isPdf && (
        <PdfDownloader
          objToPdf={objToPdf}
          setIsPdf={setIsPdf}
          isOlivir={isOlivir}
        />
      )}
      {isLoading && <MyModal />}
    </div>
  );
}

export default BCGenerator;
