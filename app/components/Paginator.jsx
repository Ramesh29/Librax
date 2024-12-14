'use client'
import _ from 'lodash'
const Paginator = ({pages, fnSetCurentPage}) => {

  
  return (
        <>
          <table>
            <tbody>
              <tr>
              { _.range(pages).map((_n, i) => <td key={i} ><button onClick={fnSetCurentPage} className="btn btn-primary" value={i+1}>{i+1}</button></td> ) }
              </tr>
            </tbody>
          </table>

        </>

  )
}

export default Paginator