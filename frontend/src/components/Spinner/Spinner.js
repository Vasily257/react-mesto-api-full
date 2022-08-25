export default function Spinner({ isOpen }) {
  return (
    <div className={`spinner ${!isOpen && 'spinner_hidden'}`}>
      <div className="spinner__blob spinner__blob_top"></div>
      <div className="spinner__blob spinner__blob_bottom"></div>
      <div className="spinner__blob spinner__blob_left"></div>
      <div className="spinner__blob spinner__blob_move-blob"></div>
    </div>
  );
}
