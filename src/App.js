import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [vx, setVx] = useState([
    { id: 1, day: 'Понедельник', tasks: [], input: '' },
    { id: 2, day: 'Вторник', tasks: [], input: '' },
    { id: 3, day: 'Среда', tasks: [], input: '' },
    { id: 4, day: 'Четверг', tasks: [], input: '' },
    { id: 5, day: 'Пятница', tasks: [], input: '' },
    { id: 6, day: 'Суббота', tasks: [], input: '' },
    { id: 7, day: 'Воскресенье', tasks: [], input: '' }
  ]);

  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDates = (weekOffset) => {
    const today = new Date();
    const currentDay = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay + 1 + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toLocaleDateString('ru-RU'));
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  const jk = (id) => {
    const day = vx.find(d => d.id === id);
    if (!day || day.input.trim() === '') return;
    
    const ty = vx.map(dayItem => {
      if (dayItem.id === id) {
        return {
          ...dayItem,
          tasks: [...dayItem.tasks, { id: Date.now(), text: day.input }],
          input: ''
        };
      }
      return dayItem;
    });
    
    setVx(ty);
  };

  const pl = (dayId, taskId) => {
    const mn = vx.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: day.tasks.filter(task => task.id !== taskId)
        };
      }
      return day;
    });
    
    setVx(mn);
  };

  const handleInputChange = (id, value) => {
    const mn = vx.map(day => {
      if (day.id === id) {
        return {
          ...day,
          input: value
        };
      }
      return day;
    });
    
    setVx(mn);
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const prevWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const resetWeek = () => {
    setCurrentWeek(0);
  };

  return (
    <div className="ab">
      <h1 className="cd">Еженедельные задачи</h1>
      
      <div className="week-controls">
        <button onClick={prevWeek} className="week-btn">← Предыдущая неделя</button>
        <button onClick={resetWeek} className="week-btn current">Текущая неделя</button>
        <button onClick={nextWeek} className="week-btn">Следующая неделя →</button>
      </div>

      <div className="ef">
        {vx.map((gh, index) => (
          <div key={gh.id} className="ij">
            <h2 className="kl">{gh.day}</h2>
            <div className="date">{weekDates[index]}</div>
            <div className="mn">
              <input
                type="text"
                value={gh.input}
                onChange={(e) => handleInputChange(gh.id, e.target.value)}
                placeholder="Введите задачу"
                className="op"
                onKeyPress={(e) => e.key === 'Enter' && jk(gh.id)}
              />
              <button 
                onClick={() => jk(gh.id)}
                className="qr"
              >
                Добавить
              </button>
            </div>
            <ul className="st">
              {gh.tasks.map(uv => (
                <li key={uv.id} className="wx">
                  <span>{uv.text}</span>
                  <button 
                    onClick={() => pl(gh.id, uv.id)}
                    className="yz"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;