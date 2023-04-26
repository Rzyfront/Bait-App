const { google } = require('googleapis');

const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
const prospectiveApi = async (comment) => {
  try {
    const config = {
      key: process.env.PERSPECTIVE_API_KEY,
      resource: {
        comment: {
          text: comment,
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      },
    };
    const { comments } = await google.discoverAPI(DISCOVERY_URL);
    const { data } = await comments.analyze(config);
    const { value } = data.attributeScores.TOXICITY.summaryScore;

    return value;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { prospectiveApi };
