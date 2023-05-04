import './App.css';
import data from './data/erpquantity.json'
import dataRows from './data/erprows.json'

function App() {


  var db = openDatabase('items', '1.0', 'Hydra', 2 * 1024 * 1024);// Первоначальное создание БД
  db.transaction(function (tx) {
    tx.executeSql('DROP TABLE IF EXISTS items');

    tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, sc_a_typ,sc_column,sc_u_month,sc_u_quantity,sc_u_week,sc_u_year,sc_verweis_okp)');

    for (let i = 2; i < 10; i++) {
      let temp = []
      temp.push(JSON.parse(data[i]))
      tx.executeSql('INSERT INTO items (sc_a_typ,sc_column,sc_u_month,sc_u_quantity,sc_u_week,sc_u_year,sc_verweis_okp) VALUES (?,?,?,?,?,?,?)', [temp[0][0], temp[0][1], temp[0][2], temp[0][3], temp[0][4], temp[0][5], temp[0][6]]);
    }

  });




  let header = []
  header.push(JSON.parse(dataRows[0]))

  const out = header[0].map((el, index) => {
    return (
      <th key={index + "_key"} className='table'>{el}</th>
    )
  })

  let row = []

  for (let i = 2; i < dataRows.length; i++) {
    let temp = []
    temp.push(JSON.parse(dataRows[i]))
    let r = temp[0].map((el, index) => {
      if (index === 21 || index === 24 || index === 25) { return <td key={index + "_key"}>JSON object</td> }
      return (
        <td key={index + "_key"}>{el}</td>
      )
    })
    //console.log(temp[0][35])
    let t = data.filter((elm) => {
      let parsed = JSON.parse(elm)
      return parsed[6] === temp[0][35]
    })
    t.sort((a, b) => {
      let aa = JSON.parse(a)
      let bb = JSON.parse(b)
      return aa[5] - bb[5] || aa[2] - bb[2] || aa[4] - bb[4]
    })
    let rr = t.map((elm) => {
      let parsed = JSON.parse(elm)
      return <td key={parsed[1]}> {parsed[1]} </td>
    })
    //console.log(rr)
    row.push(<tr key={r[35].props.children}>{r}{rr}</tr>)



  }


  return (
    <div className="App">

      <table border="1" cellSpacing="0" cellPadding="0">

        <thead>
          <tr>
            {out}
          </tr>
        </thead>

        <tbody>
          {row}
        </tbody>

      </table>

    </div>
  );
}

export default App;
