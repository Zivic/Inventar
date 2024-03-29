import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";

import {
  toggle,
  forceOpen,
  forceClose,
  selectModal,
} from "../../features/modal/modalSlice";

import GenericModal from "../../features/modal/GenericModal";
import Dashboard from "../Dashboard";
import BrzoPlus from "./BrzoPlus";
import BrzoMinus from "./BrzoMinus";
import useFetch from "../useFetch";

const TabelaProizvoda = (props) => {
  const { handleProizvodSelection } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("Stats");

  const korisnikStore = useSelector(selectKorisnik).payload;
  const dispatch = useDispatch();
  const {
    data: proizvodi,
    loading,
    error,
  } = useFetch(
    "http://localhost:3001/api/proizvodi/preduzece/" +
      korisnikStore.id_preduzeca
  );

  const history = useNavigate();
  const handleClick = (idProizvoda) => {
    console.log(idProizvoda);
    handleProizvodSelection(idProizvoda);
  };

  const modalBodyJSX = (
    <>
      <Dashboard targetovanProizvod={modalIsOpen} />
    </>
  );

  return (
    <div className="scale-in-tl">
      {modalIsOpen && (
        <GenericModal
          propHeading={modalIsOpen.naziv}
          propBody={
            modalMode === "Stats" ? (
              <Dashboard targetovanProizvod={modalIsOpen} />
            ) : modalMode === "Plus" ? (
              <BrzoPlus targetovanProizvod={modalIsOpen} />
            ) : modalMode === "Minus" ? (
              <BrzoMinus targetovanProizvod={modalIsOpen} />
            ) : null
          }
          propButtons={[
            {
              name: "ButtonText",
              func: () => dispatch(forceClose()),
            },
            {
              name: "close",
              func: () => {
                setModalIsOpen(null);
                dispatch(forceClose());
              },
            },
          ]}
        />
      )}
      tabela
      {
      console.log(proizvodi)
      }
      {proizvodi && (
        <div style={{ maxWidth: "99%" }}>
          <MaterialTable
            columns={[
              { title: "Naziv", field: "naziv" },
              { title: "Kolicina", field: "kolicina", type: "numeric" },
              { title: "Cena", field: "cena", type: "numeric" },
              { title: "Kategorija", field: "kategorija" },
            ]}
            data={[...proizvodi]}
            actions={[
              {
                icon: () => <span className="fas fa-plus"></span>,
                tooltip: "Brzo povecavanje kolicine",
                onClick: (event, rowData) => {
                  // Do save operation
                  setModalIsOpen(rowData);
                  setModalMode("Plus");
                  dispatch(forceOpen());
                },
              },
              {
                icon: () => <span className="fas fa-minus"></span>,
                tooltip: "Brzo smanjivanje kolicine",
                onClick: (event, rowData) => {
                  // Do save operation
                  setModalIsOpen(rowData);
                  setModalMode("Minus");
                  dispatch(forceOpen());
                },
              },
              {
                icon: () => <span className="fas fa-chart-pie"></span>,
                tooltip: "Statistike proizvoda",
                onClick: (event, rowData) => {
                  setModalIsOpen(rowData);
                  setModalMode("Stats");
                  dispatch(forceOpen());
                },
              },
            ]}
            title="Proizvodi"
            onRowClick={(event, rowData, togglePanel) =>
              handleClick(rowData._id)
            }
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
              headerStyle:{
                "font-weight":"bold",
                "color": "darkgray",
                "font-size": "1.4em",
                "fontFamily": "Trebuchet MS",
              },
            }}
          />
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};
export default TabelaProizvoda;
