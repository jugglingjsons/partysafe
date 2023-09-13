// utils/api.js

export async function getServerSideProps() {
  const res = await fetch("/api/druglibrary");
  const drugLibraryData = await res.json();

  return {
    props: {
      drugLibraryData,
    },
  };
}
