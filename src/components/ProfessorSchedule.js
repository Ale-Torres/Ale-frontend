import React, { useState } from 'react';
import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import scheduleData from '../mock_data/sample_schedule.json';
import interactionPlugin from "@fullcalendar/interaction";
import API from "../api";

const ProfessorSchedule = () => {
    
    const [tooltip, setTooltip] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [ schedule, setSchedule] = useState([]);
    const [ resources, setResources] = useState([]);
    const [ events, setEvents] = useState([]);


    function convertJson() {

        let rooms = new Set();
        let roomMap = new Map();
        let updatedResources = [];
        let updatedEvents = [];
        let hard_coded_professor = "David Turner";
        console.log("hello1");
   
        // map day names to numbers
        const dayMap = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        }
    
        // iterate over each item in the schedule

        for (let item of schedule) {
            console.log(item.professor.toLowerCase());
            console.log(hard_coded_professor.toLowerCase());
            if (item.professor.toLowerCase() === hard_coded_professor.toLowerCase()){
                // check if this room has already been added to the rooms map
                if (!roomMap.has(item.room)) {
                    roomMap.set(item.room, item.building);
                    
                    
                    // add the new room item to the resources
                    updatedResources = Array.from(roomMap.entries()).map(([room, building]) => {
                        return {
                            id: room,
                            building: building,
                            title: room
                        };
                    });            
                }
        
                let startTime = item.start.split("T")[1];
                let endTime = item.end.split("T")[1];
        
                // create the new format for the schedule items
                let scheduleItem = {
                    resourceId: item.room,
                    title: item.coursename,
                    start: item.start,
                    end: item.end,
                    startTime: startTime,
                    endTime: endTime,
                    daysOfWeek: item.day.map(day => dayMap[day]),
                    extendedProps: {
                        professor: item.professor,
                        building: item.building,
                        room: item.room,
                        startTime: startTime,
                        endTime: endTime
                    }
                };
                // add the new schedule item to the events
                if ((scheduleItem.extendedProps.professor.toLowerCase() === hard_coded_professor.toLowerCase())){
                    updatedEvents.push(scheduleItem);
                }
            }
        }
        setResources(updatedResources);
        setEvents(updatedEvents);
        return;
    }

    const fetchData = async () => {
        try{
            const response = await API.get('/administrator');
            setSchedule(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        convertJson();
      }, [schedule]);

    const convertTime = (time24) => {
        let [hours, minutes] = time24.split(':');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        hours = ((hours % 12) || 12) + ':' + minutes + ' ' + suffix;
        return hours;
    }      

    const handleMouseEnter = (info) => {

        const content = `Course: ${info.event.title}\nProfessor: ${info.event.extendedProps.professor}\nBuilding: ${info.event.extendedProps.building}\nRoom: ${info.event.extendedProps.room}\nTime: ${convertTime(info.event.extendedProps.startTime)} - ${convertTime(info.event.extendedProps.endTime)}`;

        const rect = info.el.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        setTooltip({
            top: rect.top + scrollTop - 10,
            left: rect.left + scrollLeft + rect.width / 2
        });

        setTooltipContent(content);
    }

    const handleMouseLeave = () => {

        setTooltip(null);
        setTooltipContent('');
    }

    const eventContent = (arg) => {
        // Customize the event content to only show the event title
        return (
          <div className="fc-content">{arg.event.title}</div>
        );
      };;

    return (
        <div className="mb-4 ml-5 mr-5">

            <FullCalendar schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"               
                plugins={[timeGridPlugin]} 
                
                selectable={true}
                droppable={true}
                snapDuration={'00:10:00'}

                slotMinTime={'08:00:00'} // 8am
                slotMaxTime={'21:00:00'} // 9pm
                slotDuration={'01:00:00'}

                eventOverlap={false}

                resourceAreaWidth={'20%'}

                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek'
                }}
                initialView='timeGridWeek'
                resourceGroupField='building'
                resources={resources}
                contentHeight={'auto'}
                events={events}
                allDaySlot = {false}
                eventMouseEnter={handleMouseEnter}
                eventMouseLeave={handleMouseLeave}
                eventContent={eventContent} 

            />
            {tooltip &&
                <div className="absolute z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 whitespace-pre"
                    style={{ top: tooltip.top, left: tooltip.left, transform: 'translate(-50%, -100%)' }}>
                    {tooltipContent}
                </div>
            }
        </div>
    );
}

export default ProfessorSchedule;