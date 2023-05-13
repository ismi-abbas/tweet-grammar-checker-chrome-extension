const api_key = document.getElementById('api_key').value
const tweet = document.getElementById('tweet').value
const change_original = document.getElementById('change-tweet').checked
const placeholderElement = document.querySelector(
  '.public-DraftEditorPlaceholder-inner',
)
const tweetInput = document.querySelector(
  '.public-DraftEditorPlaceholder-inner',
)
const result = document.getElementById('result')

const check_button = document
  .getElementById('check-btn')
  .addEventListener('click', $event => {
    fecthGPT($event.target.value)
  })

const check_button_2 = document
  .getElementById('check-btn-2')
  .addEventListener('click', getTweet)

const fecthGPT = async tweet => {
  if (!change_original) {
    var retain_tweet = tweet + 'Do not change the original tweet words'
  }

  const response = await fetch(
    'https://api.openai.com/v1/engines/davinci/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: change_original ? tweet : retain_tweet,
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
  result.innerHTML = data.choices[0].text
}

const extractTweetContent = () => {
  if (tweetInput) {
    const tweetContent = tweetInput.innerHTML

    chrome.runtime.sendMessage({ tweetContent })
  }
}

document.addEventListener('input', extractTweetContent)

document.addEventListener('compositionend', extractTweetContent)

function getTweet() {
  console.log(tweetInput)
  alert()
}

console.log('something', {
  api_key,
  tweet,
  change_original,
  placeholderElement,
  tweetInput,
})
