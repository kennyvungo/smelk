import React, { useState, useEffect } from 'react';
import { isBefore, isAfter, format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, addMonths, subMonths, getDay, eachWeekOfInterval, isWithinInterval, startOfDay } from 'date-fns';
import './Calendar.css';
import {BiSolidLeftArrowCircle, BiSolidRightArrowCircle} from "react-icons/bi";

const Calendar = ({ onDatesChange }) => {
    const today = startOfDay(new Date());
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [selectedDates, setSelectedDates] = useState([]);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    
    useEffect(() => {
        onDatesChange(selectedDates);
    }, [selectedDates, onDatesChange]);
    
    const getDatesInColumn = (start, end, dayOfWeek) => {
        const weeks = eachWeekOfInterval({ start, end });
        return weeks
        .map(weekStart => addDays(weekStart, dayOfWeek))
        .filter(date => isWithinInterval(date, { start, end }))
        .map(date => format(date, "yyyy-MM-dd"));
    };
    
    const getDayOfWeek = (date) => {
        return getDay(date);
    };

    const nextMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(prevMonth => isBefore(startOfMonth(prevMonth), currentMonth) ? prevMonth : subMonths(prevMonth, 1));
    };

    const startDrag = day => {
        setDragStart(day);
        setDragEnd(day);
    };
    
    const onDragOver = day => {
        setDragEnd(day);
    };

    const endDrag = () => {
        const startDayOfWeek = getDayOfWeek(dragStart);
        const endDayOfWeek = getDayOfWeek(dragEnd);
        
        const start = isBefore(dragStart, dragEnd) ? dragStart : dragEnd;
        const end = isAfter(dragEnd, dragStart) ? dragEnd : dragStart;
        
        const [minDay, maxDay] = startDayOfWeek < endDayOfWeek 
            ? [startDayOfWeek, endDayOfWeek] 
            : [endDayOfWeek, startDayOfWeek];
    
        let newSelections = [];
    
        for (let dayOfWeek = minDay; dayOfWeek <= maxDay; dayOfWeek++) {
            newSelections = [
                ...newSelections, 
                ...getDatesInColumn(start, end, dayOfWeek)
            ];
        }
        
        let allSelectedDates = [...selectedDates, ...newSelections];
    
        allSelectedDates = allSelectedDates.reduce((uniqueDates, current) => {
            const isAlreadySelected = uniqueDates.find(date => date === current);
            if (isAlreadySelected) {
                return uniqueDates.filter(date => date !== current);
            } else {
                return [...uniqueDates, current];
            }
        }, []);
    
        setSelectedDates(allSelectedDates);
    };

    const Header = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={prevMonth}><BiSolidLeftArrowCircle/></div>
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={nextMonth}>
                    <div className="icon"><BiSolidRightArrowCircle/></div>
                </div>
            </div>
        );
    }

    const Days = () => {
        const dateFormat = "iii";
        const days = [];

        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    const Cells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isSelected = selectedDates.includes(format(day, "yyyy-MM-dd"));
                const isDisabled = !isSameMonth(day, monthStart) || isBefore(day, today);
    
                days.push(
                    <div
                        className={`col cell ${isDisabled ? "disabled" : isSelected ? "selected" : ""}`}
                        key={day}
                        onMouseDown={() => !isDisabled && startDrag(cloneDay)}
                        onMouseUp={() => !isDisabled && endDrag(cloneDay)}
                        onMouseOver={() => !isDisabled && onDragOver(cloneDay)}
                        onDragStart={(event) => event.preventDefault()}
                    >
                        <span className="number">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}> 
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    return (
        <>
            <div className="calendar">
                {Header()}
                {Days()}
                {Cells()}
            </div>
        </>
    );
}

export default Calendar;