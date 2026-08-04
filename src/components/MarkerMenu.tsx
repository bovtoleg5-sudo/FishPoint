    import { useNavigate } from "react-router-dom";

type Props = {
  position: [number, number];
  onDelete: () => void;
};

export default function MarkerMenu({
  position,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "120px",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        background: "rgba(255,255,255,.95)",
        padding: "10px",
        borderRadius: "50px",
        boxShadow: "0 4px 15px rgba(0,0,0,.25)",
        zIndex: 5000,
      }}
    >
      <button
        onClick={() =>
          navigate("/add", {
            state: {
              location: `${position[0]}, ${position[1]}`,
            },
          })
        }
      >
        🎣
      </button>

      <button>
        ✏️
      </button>

      <button onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}