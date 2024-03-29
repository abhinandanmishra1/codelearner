import React from 'react'
import moment from 'moment'
import Interweave from 'interweave';
const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    
    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }
    console.log(modifiedText,type);
    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case 'code-block': 
      return <div className='flex flex-col'>{modifiedText.map((item, i) => {
        var s="";
        var finalAns="";
        var tabSpace="";
        for(let i=0;i<item.length;i++){
        if(item[i]!=='\r'){
            if(item[i]==='<'){
              s+="&lt;";
              continue;
            }
            if(item[i]==='<'){
              s+="&gt;";
              continue;
            }
            if(item[i]==="{"){
              s+="{";
              tabSpace+="&emsp;";
              continue;
            }
            if(item[i]==="}"){
              s+="}";
              tabSpace=tabSpace.substr(0,tabSpace.length-6);
              continue;
            }
            if(item[i]!=='\n'){
              s+=item[i];
            }
            else{
              finalAns+=`<code>${tabSpace+s}</code>`
              s="";
            }
        }
        }
        finalAns+=`<code>${s}</code>`
        return <Interweave className='flex flex-col' content={finalAns} />
      })}</div>; 
      default:
        return modifiedText;
    }
  };
  return (
    <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-auto shadow-md ">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="h-full w-full rounded-t-lg object-top"
        />
      </div>
      <div className="text-black px-4 lg:px-0 ">
        <div className=" flex items-center justify-between">
          <div className=" mr-8 flex w-full items-center lg:mb-0 lg:w-auto">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              height="20px"
              width="30px"
              className="align-midlle rounded-full"
            />
            <p className=" ml-2 align-middle text-lg text-gray-700">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-6 w-6 text-blue-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
          
        </div>
        <h1 className='text-black text-3xl font-semibold p-2 my-4'>{post.title}</h1>
        {/* Here I'm gonna writing that is very helpful to extract blog with any data */}
        {/* {As we're exporting raw content as it is} => console.log(post.content.raw) */}
        {post.content.raw.children.map((typeObj,index)=>{
          const children=typeObj.children.map((item,itemIndex)=>getContentFragment(itemIndex,item.text))
          return getContentFragment(index,children,typeObj,typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
