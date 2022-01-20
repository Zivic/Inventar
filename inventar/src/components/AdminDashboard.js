import React, {useState, useEffect} from 'react'
import axios from 'axios';
import MaterialTable from 'material-table';

const AdminDashboard = (props) => {

    const [korisnici, setKorisnici] = useState(null);
    useEffect(() => {
        //dispatch(() => toggle())
  
          axios.get("http://localhost:3001/api/korisnici" )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            setKorisnici(() => res.data);
          })
          .catch((err) => console.log(err));

      },[])

      const handleDelete = (korisnikObjekat) => {
        setKorisnici(korisnici.filter((korisnik) => {
            return korisnikObjekat._id !== korisnik._id
        }))
        console.log('deleted');
        // axios.delete("http://localhost:3001/api/korisnici/" + korisnikObjekat._id )
        // .then((res) => {
        //   console.log(res);
        //   console.log(res.data);
        //   setKorisnici(() => res.data);
        // })
        // .catch((err) => console.log(err));
      }

    return (<div>
        <h2>Admin dashboard</h2>
        {korisnici && <MaterialTable
                  columns={[
                    { title: 'Ime', field: 'ime' },
                    { title: 'Prezime', field: 'prezime' },
                    { title: 'email', field: 'email', },
                    { title: 'Tip', field: 'tip' },
                    { title: 'Kreiran', field: 'createdAt' },

                  ]}
                  data={[...korisnici]}
                  actions={[
                    {
                      icon: () => <span className ='fas fa-trash' ></span>,
                      tooltip: 'Brisanje korisnika',
                      onClick: (event, rowData) => {
                          console.log('clicked brisanje');
                          handleDelete((rowData));
                        // Do save operation
                        // setModalIsOpen(rowData);
                        // setModalMode('Plus');
                        // dispatch(forceOpen())
                      }
                    },
                  ]}
                  title="Korisnici"
                  //onRowClick={(event, rowData, togglePanel) => handleClick(rowData._id)}
                  options={{
                    actionsColumnIndex: -1
                  }}
        />}
    </div>)
}

export default AdminDashboard