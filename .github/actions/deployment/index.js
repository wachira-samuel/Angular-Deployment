const core = require("@actions/core"); 
const exec = require("@actions/exec");

async function run() {
  try {
    const bucket = core.getInput("bucketName", { required: true });
    const bucketRegion = core.getInput("bucketRegion", { required: true });
    const distFiles = core.getInput("distFiles", { required: true });

    const s3Url = `s3://${bucket}`;

    await exec.exec(
      `aws s3 sync ${distFiles} ${s3Url} --region ${bucketRegion}`
    );

    const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput("URL", websiteURL);
    core.info(`${websiteURL}`);
  } catch (error) {
    core.setFailed(`${error.message}`);
  }
}
run();
