import './App.css';
import data from './data/erpquantity.json'

function App() {

  let header = []
  header.push(JSON.parse(data[0]))

  const out = header[0].map((el) => {
    return (
      <th className='table'>{el}</th>
    )
  })

  let row = []

  for (let i = 2; i < 200; i++) {
    let temp = []
    temp.push(JSON.parse(data[i]))
    let r = temp[0].map((el) => {

      return (
        <td>{el}</td>
      )
    })
    row.push(<tr>{r}</tr>)

  }


  return (
    <div className="App">

      <table border="1" cellspacing="0" cellpadding="0">

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
