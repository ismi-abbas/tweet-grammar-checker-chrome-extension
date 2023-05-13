const api_key = document.getElementById('api_key').value
const tweet = document.getElementById('tweet').value
const change_original = document.getElementById('change-tweet').value

const fecthGPT = async tweet => {
  if (change_original) {
    tweet + 'Do not change the original tweet words'
  }

  const response = await fetch(
    'https://api.openai.com/v1/engines/davinci/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: change_original ? change_original : tweet,
        max_tokens: 100,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ['\n', ' Human:'],
      }),
    },
  )
  const data = await response.json()
  return data.choices[0].text
}
