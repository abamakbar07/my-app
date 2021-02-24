import React, {useContext} from 'react'
import { AppContext } from '../../../components/context/GlobalContext'

const Transaction = () => {
   const [state, dispatch] = useContext(AppContext)
   
   console.log(state.isAdmin)

   return (
      <div>
         Admin Transaction
      </div>
   )
}

export default Transaction
