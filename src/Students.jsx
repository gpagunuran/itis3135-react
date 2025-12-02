import { useState, useEffect } from 'react';
import './App.css';

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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.mascot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  const renderStudent = (student) => (
    <div key={student.id} className="student-card">
      <h3>{student.name}</h3>
      <div className="student-info">
        <p><strong>Mascot:</strong> {student.mascot}</p>
        {student.image && (
          <img 
            src={student.image} 
            alt={`${student.name}'s photo`}
            className="student-image"
          />
        )}
        <p><strong>Personal Background:</strong> {student.personal_background}</p>
        <p><strong>Academic Background:</strong> {student.academic_background}</p>
        
        {student.background_in_subject && (
          <p><strong>Background in Subject:</strong> {student.background_in_subject}</p>
        )}
        
        {student.primary_computer_platform && (
          <p><strong>Primary Computer Platform:</strong> {student.primary_computer_platform}</p>
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
        
        {student.funny_thing && (
          <p className="funny-thing"><strong>Funny/Interesting Thing:</strong> {student.funny_thing}</p>
        )}
        
        {student.something_i_would_like_to_share && (
          <p className="share-item"><strong>Something to Share:</strong> {student.something_i_would_like_to_share}</p>
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