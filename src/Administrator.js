import AdminNavbar from './components/AdminNavbar';
import { Routes, Route } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Example() {
  return (
    <div class="container mx-auto px-10 max-w-screen-lg">
      <AdminNavbar></AdminNavbar> 
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    </div>
  )
}
