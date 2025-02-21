const core=require('@actions/core');
const github=require('@actions/exec');

async function run(){
  try{
    const bucket=core.getInput('bucketName', {required:true});
    const bucketRegion=core.getInput('bucketRegion', {required:true});
    const distFile=core.getInput('distFile', {required:true});

    const s3Url=`s3://${bucket}`;

    await github.exec(`aws s3 async ${distFile} ${s3Url} --region ${bucketRegion}`);

    const websiteUrl=`http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    core.setOutput('websiteUrl', websiteUrl);

  }catch(error){
    core.setFailed(error.message);
  }
}
