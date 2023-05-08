import './App.css';
import data from './data/erpquantity.json'
import dataRows from './data/erprows.json'
import { useState, useEffect } from 'react'

function App() {

  const [quantity, setQuantity] = useState([])
  const [erprows, setErprows] = useState([])
  const [outRow, setOutrow] = useState([])

  ///// Первоначальное создание БД
  // var db = openDatabase('items', '1.0', 'Hydra', 2 * 1024 * 1024);
  // db.transaction(function (tx) {
  //   tx.executeSql('DROP TABLE IF EXISTS items');

  //   tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, sc_a_typ,sc_column,sc_u_month,sc_u_quantity,sc_u_week,sc_u_year,sc_verweis_okp)');

  //   for (let i = 2; i < 10; i++) { // 10 rows only
  //     let temp = []
  //     temp.push(JSON.parse(data[i]))
  //     tx.executeSql('INSERT INTO items (sc_a_typ,sc_column,sc_u_month,sc_u_quantity,sc_u_week,sc_u_year,sc_verweis_okp) VALUES (?,?,?,?,?,?,?)', [temp[0][0], temp[0][1], temp[0][2], temp[0][3], temp[0][4], temp[0][5], temp[0][6]]);
  //   }

  // });
  ///// Первоначальное создание БД



  useEffect(() => {
    let tempQ = []
    let erpR = []
    for (let i = 2; i < data.length; i++) {
      tempQ.push(JSON.parse(data[i]))
    }
    for (let i = 2; i < dataRows.length; i++) {
      erpR.push(JSON.parse(dataRows[i]))
    }
    setQuantity(tempQ)
    setErprows(erpR)

  }, [])

  useEffect(() => {
    if (erprows[1] && quantity[1]) {
      let row = []
      for (let i = 2; i < 13; i++) {

        let r = erprows[i].map((el, index) => {
          if (index === 21 || index === 24 || index === 25) { return <td key={index + "_key"}>JSON object</td> }
          return (
            <td key={index + "_key"}>{el}</td>
          )
        })
        //console.log(temp[0][35])
        let t = quantity.filter((elm) => { //filtering ids
          return elm[6] === erprows[i][35]
        })
        t.sort((a, b) => {

          return a[5] - b[5] || a[2] - b[2] || a[4] - b[4] //sorting in row
        })
        let rr = t.map((elm) => {
          return <td key={elm[1]}> {elm[1]} </td>
        })
        //console.log(rr)
        row.push(<tr key={r[35].props.children}>{r}{rr}</tr>) //static cells & generated cells
      }

      setOutrow(row)

    }

  }, [erprows, quantity])

  console.log("temp " + quantity[1])
  console.log("erp " + erprows[1][35])
  console.log("ouRow " + outRow[1])

  ///// Header of the static table
  let header = []
  header.push(JSON.parse(dataRows[0]))

  const out = header[0].map((el, index) => {
    return (
      <th key={index + "_key"} className='table'>{el}</th>
    )
  })
  ///// Header of the static table







  ///// Building rows for the static table
  // let row = []
  // for (let i = 2; i < 13; i++) {
  //   let temp = []
  //   temp.push(JSON.parse(dataRows[i]))
  //   let r = temp[0].map((el, index) => {
  //     if (index === 21 || index === 24 || index === 25) { return <td key={index + "_key"}>JSON object</td> }
  //     return (
  //       <td key={index + "_key"}>{el}</td>
  //     )
  //   })
  //   //console.log(temp[0][35])
  //   let t = data.filter((elm) => { //filtering ids
  //     let parsed = JSON.parse(elm)
  //     return parsed[6] === temp[0][35]
  //   })
  //   t.sort((a, b) => {
  //     let aa = JSON.parse(a)
  //     let bb = JSON.parse(b)
  //     return aa[5] - bb[5] || aa[2] - bb[2] || aa[4] - bb[4] //sorting in row
  //   })
  //   let rr = t.map((elm) => {
  //     let parsed = JSON.parse(elm)
  //     return <td key={parsed[1]}> {parsed[1]} </td>
  //   })
  //   //console.log(rr)
  //   row.push(<tr key={r[35].props.children}>{r}{rr}</tr>) //static cells & generated cells
  // }
  ///// Building rows for the static table


  return (
    <div className="App">

      <table border="1" cellSpacing="0" cellPadding="0">

        <thead>
          <tr>
            {out}
          </tr>
        </thead>

        <tbody>
          {outRow ? outRow : ""}
        </tbody>

      </table>

    </div>
  );
}

export default App;
