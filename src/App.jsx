import { useState, useEffect, useMemo } from 'react'
import { CiFilter } from "react-icons/ci";

function App() {

  const AIP = "http://localhost:3000/students"

  const [AllData, setAllData] = useState([]);
  const [currentpagedata, setCurrentPageData] = useState(1);
  const [perpagedata, setPerPageData] = useState(10);
  const [search, setSearch] = useState("");
  const [issorted, setIsSorted] = useState(false);

  const totalPages = Math.ceil(AllData.length / perpagedata);

  let lastIndex = (currentpagedata - 1) * perpagedata;
  let firstIndex = lastIndex + perpagedata;
  let currentData = AllData.slice(lastIndex, firstIndex);

  useEffect(() => {

    fetch(AIP, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data)
      })

  }, [])


  let filterData = useMemo(() => {
    if (!issorted) {
      return [...currentData];
    }
    return [...currentData].sort((a, b) => {
      return a.age - b.age;
    })
  }, [currentData, issorted])

  const handleFilter = () => {
    if (!issorted)
      setIsSorted(true);

    else
      setIsSorted(false);
  }



  return (
    <>
      <h1 className="text-center p-4"><u><b>STUDENTS DATA</b></u></h1>

      <div className='d-flex p-3'>

        <input type="text" placeholder='Search Here' className='flex-grow-1 py-2 px-3 bordered rounded' onChange={(e) => {
          setSearch(e.target.value);
        }} />

      </div>

      <table className="table table-bordered table-success table-striped  text-center">

        <thead className='table-primary'>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>E-MAIL</th>
            <th className='d-flex justify-content-between align-items-center'>AGE
              <CiFilter onClick={handleFilter} size={20} />
            </th>
            <th>GENDER</th>
            <th>COURSE</th>
            <th>CITY</th>
          </tr>
        </thead>

        <tbody>
          {filterData.filter((element) => {
            return element.name.toLowerCase().includes(search.toLowerCase())
          }).map((Students) => (
            <tr key={Students.id}>
              <td>{Students.id}</td>
              <td>{Students.name}</td>
              <td>{Students.email}</td>
              <td>{Students.age}</td>
              <td>{Students.gender}</td>
              <td>{Students.course}</td>
              <td>{Students.city}</td>

            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7">
              <div className="d-flex justify-content-between align-items-center mt-3">

                <div className="d-flex align-items-center gap-2 ">
                  <span> Per Pages Data</span>

                  <select className="form-select form-select-sm w-auto d-flex align-items-center" value={perpagedata} onChange={(e) => setPerPageData((e.target.value))}>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                    <option>100</option>
                    <option>150</option>
                    <option>200</option>
                    <option>250</option>
                    <option>300</option>

                  </select>
                </div>

                <div>
                  <span className="fw-bold">Page {currentpagedata} of {totalPages}</span>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn bordered text-black btn-sm btn-danger" onClick={() => setCurrentPageData(currentpagedata - 1)} disabled={currentpagedata == 1}>
                    ⏮️ Previous
                  </button>

                  <button className="btn btn-primary btn-sm" onClick={() => setCurrentPageData(currentpagedata + 1)} disabled={currentpagedata == totalPages}>
                    Next ⏭️
                  </button>
                </div>

              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default App