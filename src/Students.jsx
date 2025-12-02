import { useState, useEffect } from 'react';
import './Students.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'single'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter(student => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    const mascot = student.mascot?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || mascot.includes(search);
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  const renderStudent = (student) => (
    <div key={student.prefix} className="student-card">
      <h3>{student.name.first} {student.name.last}</h3>
      <div className="student-info">
        <p><strong>Mascot:</strong> {student.mascot}</p>
        {student.media?.hasImage && student.media.src && (
          <img 
            src={`https://dvonb.xyz${student.media.src}`}
            alt={`${student.name.first} ${student.name.last}'s photo`}
            className="student-image"
          />
        )}
        <p><strong>Personal Background:</strong> {student.backgrounds.personal}</p>
        <p><strong>Academic Background:</strong> {student.backgrounds.academic}</p>
        
        {student.backgrounds.professional && (
          <p><strong>Professional Background:</strong> {student.backgrounds.professional}</p>
        )}
        
        {student.platform && (
          <p><strong>Primary Computer Platform:</strong> {student.platform.device} ({student.platform.os})</p>
        )}
        
        {student.courses && student.courses.length > 0 && (
          <div className="courses-section">
            <strong>Courses:</strong>
            <ul>
              {student.courses.map((course, index) => (
                <li key={index}>
                  <strong>{course.code}:</strong> {course.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {student.funFact && (
          <p className="funny-thing"><strong>Fun Fact:</strong> {student.funFact}</p>
        )}
        
        {student.quote && (
          <p className="share-item">
            <strong>Quote:</strong> "{student.quote.text}" - {student.quote.author}
          </p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="students-container">
        <h2>ITIS 3135 Students</h2>
        <p className="loading">Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="students-container">
        <h2>ITIS 3135 Students</h2>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="students-container">
      <h2>ITIS 3135 Students</h2>
      
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or mascot..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            className="search-input"
          />
        </div>
        
        <div className="view-controls">
          <button 
            onClick={() => setViewMode('all')}
            className={viewMode === 'all' ? 'active' : ''}
          >
            Show All
          </button>
          <button 
            onClick={() => setViewMode('single')}
            className={viewMode === 'single' ? 'active' : ''}
          >
            Show One
          </button>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-results">No students found matching "{searchTerm}"</p>
      ) : (
        <>
          {viewMode === 'single' && (
            <div className="navigation-controls">
              <button onClick={handlePrevious} className="nav-button">← Previous</button>
              <span className="student-counter">
                Student {currentIndex + 1} of {filteredStudents.length}
              </span>
              <button onClick={handleNext} className="nav-button">Next →</button>
            </div>
          )}

          <div className="students-list">
            {viewMode === 'all' 
              ? filteredStudents.map(student => renderStudent(student))
              : renderStudent(filteredStudents[currentIndex])
            }
          </div>
        </>
      )}
    </div>
  );
}