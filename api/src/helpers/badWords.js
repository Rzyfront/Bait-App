const badWords = ['boludo', 'idiota', 'hijo de puta', 'estupido', 'estupida', 'imbecil', 'estúpido', 'estúpida', 'imbécil', 'mierda', 'cabrón', 'cabron'];

const isAppropriate = (value) => {
  const words = value.toLowerCase().split(' ');

  const foundBadWord = words.some((word) => badWords.includes(word.toLowerCase()));

  if (foundBadWord) {
    throw new Error('Comment contains inappropriate words.');
  }
};

module.exports = { isAppropriate };
