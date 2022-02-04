export async function getQuote ( delay = 1000 ) {
  const res = await fetch( `/api/quote?time=${delay}` )

  if ( res.ok ) {
    let data = await res.json()

    return data
  } else {
    throw new Error( await res.text() )
  }
}