export default function AddButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="p-2 w-36 text-clr-text-black bg-clr-text-info outline-none border-none rounded-3xl px-5 text-sm hover:bg-clr-text-info-hover"
    >
      {text}
    </button>
  );
}
