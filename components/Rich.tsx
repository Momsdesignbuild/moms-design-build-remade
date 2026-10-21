// A paragraph from the Studio: *stars* highlight the words in the brand colour.
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <em key={i} className="text-brand not-italic">
            {part}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}
