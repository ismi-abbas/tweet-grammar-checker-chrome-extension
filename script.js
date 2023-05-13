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
  document.getElementById('result').innerHTML = data.choices[0].text
}

const extractTweetContent = () => {
  // Find the tweet input field or textarea
  const tweetInput = document.querySelector('[data-testid="tweetTextarea_0"]')

  if (tweetInput) {
    // Extract the tweet content
    const tweetContent = tweetInput.value

    // Send the tweet content to the background script
    chrome.runtime.sendMessage({ tweetContent })
  }
}
