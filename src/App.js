import './App.css';
import styles from './header.module.css'
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import data from './data/erpquantity.json'
import dataRows from './data/erprows.json'
import months from './data/timeline.json'
import { useState, useEffect, useRef } from 'react'

function App() {

  const [quantity, setQuantity] = useState([])
  const [erprows, setErprows] = useState([])
  const [outRow, setOutRow] = useState([])
  //var outputRef = useRef()

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
    let lib = {}
    for (let i = 2; i < data.length; i++) {
      tempQ.push(JSON.parse(data[i]))
      //let temp = JSON.parse(data[i])
      //['PPP', 'ppp_48_11_2023', 11, 0, 48, 2023, '6107B00B-7DCE-4660-8955-EF2D730B5879']
    }
    for (let i = 2; i < dataRows.length; i++) {
      erpR.push(JSON.parse(dataRows[i]))
    }
    setQuantity(tempQ)
    setErprows(erpR)

  }, [])



  // useEffect(() => {
  //   if (quantity[1] && erprows[1]) {
  //     console.log("effect!")
  //     outputRef.current = function (int) {
  //       let r = erprows[int].map((el, index) => {
  //         if (index === 21 || index === 24 || index === 25) { return <td key={index + "_key"}>JSON object</td> }
  //         return (
  //           <td key={index + "_key"}>{el}</td>
  //         )
  //       });
  //       let t = quantity.filter((elm) => {
  //         //filtering ids
  //         return elm[6] === erprows[int][35]
  //       });
  //       t.sort((a, b) => {

  //         return a[5] - b[5] || a[2] - b[2] || a[4] - b[4] //sorting in row
  //       })
  //       let rr = t.map((elm, index) => {
  //         return <td key={elm[1] + index}> {elm[1]} </td>;
  //       });

  //       return (
  //         <>
  //           <table border="1" cellSpacing="0" cellPadding="0">
  //             <thead style={{ visibility: "collapse" }}>
  //               <tr>
  //                 {out}
  //               </tr>
  //             </thead>

  //             <tbody>
  //               <tr>
  //                 {r}
  //                 {rr}
  //               </tr>
  //             </tbody>
  //           </table>
  //         </>
  //       );

  //     }
  //   }

  // }, [erprows, quantity])
  //---------------------------------------------------------

  useEffect(() => {
    if (erprows[1] && quantity[1]) {
      let row = []
      let timeObject = {}


      function timeCells(timeObject) {
        let arr = []

        for (const property in timeObject) {

          const weekObj = timeObject[property]
          for (const week in weekObj) {
            //console.log(`${week} : ${weekObj[week]}`)
            const params = weekObj[week]
            let arrParams = []
            for (const value in params) {
              //console.log(`${value} : ${params[value]}`)
              arrParams.push(`${value} : ${params[value]}`)
            }
            arr.push(arrParams)
          }
        }
        //console.log(arr)
        return arr
      }

      for (let i = 2; i < 10; i++) {

        timeObject[new Date().getFullYear()] = months
        timeObject[new Date().getFullYear() - 1] = months
        timeObject[new Date().getFullYear() - 2] = months

        let temp = []
        let flat = []

        let t = quantity.filter((elm) => { //filtering ids
          return elm[6] === erprows[i][35]
        })
        //['PPP', 'ppp_48_11_2023', 11, 0, 48, 2023, '6107B00B-7DCE-4660-8955-EF2D730B5879']
        //console.log(t)
        for (let item of t) {
          //console.log(item[5], item[2], item[4], item[0])
          timeObject[item[5]][item[2]][item[4]][item[0]] = item[3]
        }
        let nextRow = timeCells(timeObject[new Date().getFullYear()])
        console.log(timeObject)
        row.push([...erprows[i], ...nextRow])

        // flat = temp.flat(3)

        // row.push(flat) //static cells & generated cells
      }
      //console.log(row[1])
      setOutRow(row)


    }

  }, [erprows, quantity])

  // console.log("temp " + quantity[1])
  // console.log("erp " + erprows[1][35])
  // console.log("ouRow " + outRow[1])


  ///// Header of the static table

  //LGORT,
  let header = []
  header.push(JSON.parse(dataRows[0]))

  const out = header[0].map((el, index) => {
    return (
      //<th key={index + "_key"} className='table'>{el}</th>
      <div key={index + "_key"} className={styles.productHeader}> {el}</div>
    )
  })
  ///// Header of the static table



  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      {/* <RowComponent i={index} /> */}


      {/* {outputRef.current && outputRef.current(index)} */}
    </div>
  );

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? 'GridItemOdd'
            : 'GridItemEven'
          : rowIndex % 2
            ? 'GridItemOdd'
            : 'GridItemEven'
      }
      style={style}
    >
      {outRow[1] && outRow[rowIndex][columnIndex]}
      {/* Item {rowIndex},{columnIndex} */}
    </div>
  );



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
    <AutoSizer disableWidth>

      {({ height }) => (
        <>
          <div className={styles.headerContainer}>
            {out}
            <div className={styles.timeContainer}>
              <div>YEAR</div>
              <div className={styles.month}> MONTH
                <div className={styles.weekContainer}>
                  <div className={styles.week}>week1</div>
                  <div className={styles.week}>week2</div>
                  <div className={styles.week}>week3</div>
                  <div className={styles.week}>week4</div>
                </div>
              </div>

            </div>




            {/* <table border="0" cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  {out}
                </tr>
              </thead>
            </table> */}

          </div>
          {/* <List className="List" height={height} itemCount={dataRows.length} itemSize={75} width={width}>
            {Row}
          </List> */}

          <Grid
            className="Grid"
            columnCount={60}
            columnWidth={200}
            height={height}
            rowCount={7}
            rowHeight={100}
            width={11000}
          >
            {Cell}
          </Grid>


        </>
      )}
    </AutoSizer>


  )
}

export default App;
