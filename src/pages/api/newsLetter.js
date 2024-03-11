import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  const { email } = req.body;

  console.log({ email });

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const API_KEY = "bee88f008639956562b58e10150ba4a8-us11";
    const DATACENTER = "us11";
    const AUDIENCE_ID = "4995ff897f";
    const existingMemberResponse = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    if (existingMemberResponse.status === 200) {
      // User already exists, update subscription status
      const existingMemberData = await existingMemberResponse.json();
      const response = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${existingMemberData.id}`,
        {
          body: JSON.stringify({
            status: 'subscribed',
            // merge_fields: { FNAME: firstName, LNAME: lastName },
          }),
          headers: {
            Authorization: `apikey ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        }
      );

      if (response.status >= 400) {
        return res.status(400).json({
          error: `There was an error updating the subscription status.`,
        });
      }

      // Trigger the email campaign after successful subscription
      await triggerEmailCampaign(API_KEY, DATACENTER, AUDIENCE_ID);

      return res.status(200).json({ error: '' });
    } else if (existingMemberResponse.status === 404) {
      // User does not exist, subscribe them
      const data = {
        email_address: email,
        status: 'subscribed',
        // merge_fields: { FNAME: firstName, LNAME: lastName },
      };

      const subscribeResponse = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          body: JSON.stringify(data),
          headers: {
            Authorization: `apikey ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );

      if (subscribeResponse.status >= 400) {
        return res.status(400).json({
          error: `There was an error subscribing to the newsletter.`,
        });
      }

      // Trigger the email campaign after successful subscription
      await triggerEmailCampaign(API_KEY, DATACENTER, AUDIENCE_ID);

      return res.status(201).json({ error: '' });
    } else {
      // Some other error occurred
      return res.status(existingMemberResponse.status).json({
        error: `Mailchimp API error: ${existingMemberResponse.statusText}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

async function triggerEmailCampaign(apiKey, datacenter, audienceId) {
  // Make an API request to trigger the email campaign
  // Use the Mailchimp API to start the automated campaign for new subscribers
  // You'll need to find the appropriate API endpoint and parameters for this action
  // Example:
  // const campaignResponse = await fetch(
  //   `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${CAMPAIGN_ID}/actions/send`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `apikey ${apiKey}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // Handle the response or any additional logic based on your requirements
}
