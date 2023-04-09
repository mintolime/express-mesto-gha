//посмотреть стили , чтобы футер не прыгал наверх
function Loading({ error }) {
  return (
    <div className="loading">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </>
      )}
    </div>
  );
}

export default Loading;
