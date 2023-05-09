import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import { useNavigate, Navigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { API_LINK } from "../../global/config";

import Modal from "@mui/material/Modal";

import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./styles.css";

interface Record {
  id_operateur: string;
  id_technicien: string;
  titre: string;
  nom: string;
  code_postal: string;
  telephone: string;
  adresse: string;
  fiche_technique: string;
  details: string;
  etat: string;
  fiche_technique_url: string;
}

const PAGE_SIZE = 8;
export default function ListMission() {
  const [data, setData] = useState<Record[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Record[]>(data);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentListId, setCurrentListId] = useState("");
  const [dependencyValue, setDependencyValue] = useState(true);
  const [nom, setnom] = useState("");
  const [adresse, setadresse] = useState("");
  const [code_postal, setcode_postal] = useState("");

  const [fiche_technique, setFicheTechnique] = useState("");
  const [telephone, setTelephone] = useState("");
  const [details, setDetails] = useState("");
  const [titre, settitre] = useState("");
  const [etat, setEtat] = useState("");
  const [loginError, setloginError] = useState(2);
  const [loginErrorMessage, setloginErrorMessage] = useState("");

  const filterData = (value: string) => {
    setSearchValue(value);
    const newData = data.filter((record) => {
      const Name = record.nom.toLowerCase();
      const email = record.titre.toLowerCase();
      const telephone = record.telephone.toLowerCase();
      const search = value.toLowerCase();
      return (
        Name.includes(search) ||
        email.includes(search) ||
        telephone.includes(search)
      );
    });
    setFilteredData(newData);
    setTotalPages(Math.ceil(newData.length / PAGE_SIZE));
    setPage(1);
  };

  useEffect(() => {
    let id_operateur = localStorage.getItem("id");
    axios
      .get(`${API_LINK}/ListMission/${id_operateur}?page=${page}`)
      .then((response) => {
        // Add the "fiche_technique_url" property to each record
        const newData = response.data.data.map((record: { fiche_technique: any; }) => ({
          ...record,
          fiche_technique_url: `${API_LINK}/upload/${record.fiche_technique}`,
        }));
        setData(newData);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page]);

  const handleClick = () => {
    toast("Updated Successfully");

    setIsLoading(true);

    let formData = {
      nom: nom,
      adresse: adresse,
      code_postal: code_postal,
      fiche_technique: fiche_technique,
      telephone: telephone,
      details: details,
      titre: titre,
      etat: etat,
    };

    let id_operateur = localStorage.getItem("id");
    console.log(id_operateur);
    axios
      .post(`${API_LINK}/AddMission/${id_operateur}`, formData)
      .then((response) => {
        console.log(response);
        console.log(formData);

        setloginError(response.data.code);
        console.log(response.data.code);
        setloginErrorMessage(response.data.message);
        console.log(response.data.message);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setFilteredData(data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    setTotalPages(Math.ceil(data.length / PAGE_SIZE));
  }, [data, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <div>
        <div className="search-mission">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => filterData(e.target.value)}
            placeholder="Search by title or name"
          />
        </div>
        <TableContainer>
          <button
            className="add-btn"
            onClick={() => {
              handleOpen();
            }}
          >
            + Add
          </button>
          <Table aria-label="sticky table">
            <TableHead
              style={{
                backgroundColor: "#f8f8f8",
                color: "#333",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "20%",
              }}
            >
              <TableRow>
                <TableCell>
                  <center>
                    <b>Titre</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Name</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Postal Code</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Phone</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Address</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Technic File</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Details</b>
                  </center>
                </TableCell>
                <TableCell align="right">
                  <center>
                    <b>Status</b>
                  </center>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id_operateur} sx={{ "": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <center> {record.nom}</center>
                  </TableCell>
                  <TableCell align="right">
                    <center>{record.titre}</center>
                  </TableCell>
                  <TableCell align="right">
                    <center>{record.code_postal}</center>
                  </TableCell>
                  <TableCell align="right">
                    <center>{record.telephone}</center>
                  </TableCell>
                  <TableCell align="right">
                    <center>{record.adresse}</center>
                  </TableCell>
                  <TableCell align="right">
                    <center> <a href={record.fiche_technique_url} download={record.fiche_technique}>
          Download
        </a></center>
                  </TableCell>
                  <TableCell align="right">
                    <center>{record.details}</center>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color:
                        record.etat === "ON HOLD"
                          ? "red"
                          : record.etat === "IN PROGRESS"
                          ? "orange"
                          : record.etat === "DONE"
                          ? "green"
                          : "inherit",
                    }}
                  >
                    <center>{record.etat}</center>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </TableContainer>
      </div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Col className="addMission">
            <button className="close-button" onClick={handleClose}>
              x
            </button>
            <form>
              <span className="InscriptionSubtitle">ADD MISSION</span>
              <input
                required
                type="text"
                className="Inscription"
                placeholder="Titre"
                value={titre}
                onChange={(e) => settitre(e.target.value)}
              />
              <div className="spacer-20"></div>

              <input
                required
                type="text"
                className="Inscription"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
              />

              <div className="spacer-20"></div>

              <input
                required
                type="text"
                className="Inscription"
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setadresse(e.target.value)}
              />

              <div className="spacer-20"></div>
              <input
                required
                type="text"
                className="Inscription"
                placeholder="Code Postal"
                value={code_postal}
                onChange={(e) => setcode_postal(e.target.value)}
              />
              <div className="spacer-20"></div>
              <input
                required
                type="text"
                className="Inscription"
                placeholder="Telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />

              <div className="spacer-20"></div>
              <input
                id="myFileInput"
                type="file"
                className="Inscription"
                value={fiche_technique}
                onChange={(e) => setFicheTechnique(e.target.value)}
              />
              <input
                required
                type="text"
                className="Inscription"
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />

              <div className="spacer-20"></div>

              {IsLoading ? (
                <Spinner animation="border" variant="info">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <button
                  type="submit"
                  className="inscription-button"
                  onClick={(e) => {
                    handleClick();
                  }}
                >
                  Add a mission
                </button>
              )}
            </form>
          </Col>
        </Modal>
      </div>
    </>
  );
}
