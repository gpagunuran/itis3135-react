import { useState, useEffect } from 'react';
import './Students.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'
  
  // Checkboxes for what to display
  const [displayOptions, setDisplayOptions] = useState({
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    backgrounds: true,
    classes: true,
    extraInfo: true,
    quote: true,
    links: true
  });

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
    const search = searchTerm.toLowerCase();
    return fullName.includes(search);
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  const toggleDisplayOption = (option) => {
    setDisplayOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const renderStudent = (student) => (
    <div key={student.prefix} className="student-card">
      {displayOptions.name && (
        <h3>{student.name.first} {student.name.last}</h3>
      )}
      
      <div className="student-info">
        {displayOptions.mascot && (
          <p><strong>Mascot:</strong> {student.mascot}</p>
        )}
        
        {displayOptions.image && student.media?.hasImage && student.media.src && (
          <div className="image-container">
            <img 
              src={`https://dvonb.xyz${student.media.src}`}
              alt={`${student.name.first} ${student.name.last}'s photo`}
              className="student-image"
            />
            {student.media.caption && <p className="image-caption">{student.media.caption}</p>}
          </div>
        )}
        
        {displayOptions.personalStatement && student.personalStatement && (
          <p><strong>Personal Statement:</strong> {student.personalStatement}</p>
        )}
        
        {displayOptions.backgrounds && (
          <div className="backgrounds-section">
            <strong>Backgrounds:</strong>
            {student.backgrounds.personal && (
              <p><strong>Personal:</strong> {student.backgrounds.personal}</p>
            )}
            {student.backgrounds.academic && (
              <p><strong>Academic:</strong> {student.backgrounds.academic}</p>
            )}
            {student.backgrounds.professional && (
              <p><strong>Professional:</strong> {student.backgrounds.professional}</p>
            )}
          </div>
        )}
        
        {displayOptions.classes && student.courses && student.courses.length > 0 && (
          <div className="courses-section">
            <strong>Courses:</strong>
            <ul>
              {student.courses.map((course, index) => (
                <li key={index}>
                  <strong>{course.code} - {course.name}:</strong> {course.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {displayOptions.extraInfo && (
          <div className="extra-info-section">
            {student.platform && (
              <p><strong>Computer Platform:</strong> {student.platform.device} ({student.platform.os})</p>
            )}
            {student.funFact && (
              <p className="fun-fact"><strong>Fun Fact:</strong> {student.funFact}</p>
            )}
            {student.additional && (
              <p><strong>Additional:</strong> {student.additional}</p>
            )}
          </div>
        )}
        
        {displayOptions.quote && student.quote && (
          <p className="quote-display">
            <strong>Quote:</strong> "{student.quote.text}" - <em>{student.quote.author}</em>
          </p>
        )}
        
        {displayOptions.links && student.links && (
          <div className="links-section">
            <strong>Links:</strong>
            <div className="links-grid">
              {student.links.charlotte && <a href={student.links.charlotte} target="_blank" rel="noopener noreferrer">CLT Web</a>}
              {student.links.github && <a href={student.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {student.links.githubio && <a href={student.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a>}
              {student.links.itis3135 && <a href={student.links.itis3135} target="_blank" rel="noopener noreferrer">ITIS3135</a>}
              {student.links.freecodecamp && <a href={student.links.freecodecamp} target="_blank" rel="noopener noreferrer">freeCodeCamp</a>}
              {student.links.codecademy && <a href={student.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a>}
              {student.links.linkedin && <a href={student.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            </div>
          </div>
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
      
      <div className="controls-wrapper">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            className="search-input"
          />
          <p className="student-counter">
            Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="display-options">
          <h3>Display Options:</h3>
          <div className="checkboxes-grid">
            <label>
              <input
                type="checkbox"
                checked={displayOptions.name}
                onChange={() => toggleDisplayOption('name')}
              />
              Name
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.mascot}
                onChange={() => toggleDisplayOption('mascot')}
              />
              Mascot
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.image}
                onChange={() => toggleDisplayOption('image')}
              />
              Image
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.personalStatement}
                onChange={() => toggleDisplayOption('personalStatement')}
              />
              Personal Statement
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.backgrounds}
                onChange={() => toggleDisplayOption('backgrounds')}
              />
              Backgrounds
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.classes}
                onChange={() => toggleDisplayOption('classes')}
              />
              Classes
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.extraInfo}
                onChange={() => toggleDisplayOption('extraInfo')}
              />
              Extra Information
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.quote}
                onChange={() => toggleDisplayOption('quote')}
              />
              Quote
            </label>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.links}
                onChange={() => toggleDisplayOption('links')}
              />
              Links
            </label>
          </div>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-results">No students found matching "{searchTerm}"</p>
      ) : (
        <>
          <div className="navigation-controls">
            <button onClick={handlePrevious} className="nav-button">← Previous</button>
            <span className="student-counter-nav">
              Student {currentIndex + 1} of {filteredStudents.length}
            </span>
            <button onClick={handleNext} className="nav-button">Next →</button>
          </div>

          <div className="students-display">
            {renderStudent(filteredStudents[currentIndex])}
          </div>
        </>
      )}
    </div>
  );
}