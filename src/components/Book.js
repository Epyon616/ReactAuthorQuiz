import React from 'react'; 

function Book({title, onClick}) {
  return(
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
}

export default Book;