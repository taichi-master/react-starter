export async function getQuote ( delay = 1000 ) {
  const res = await fetch( `/api/quote?time=${delay}` ),
        data = await res.text()

  return data
}