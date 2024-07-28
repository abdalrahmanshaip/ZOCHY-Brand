import Layout from '../layout/Layout'
import imgContactUs from '../assets/image-4-1024x1024.webp'
import { MdOutlinePhone, MdOutlineEmail } from 'react-icons/md'
import { FaInstagram } from 'react-icons/fa6'

const Contact = () => {
  return (
    <Layout>
      <div className='bg-[#D1CCCA] h-[92vh]'>
        <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex  items-center h-full flex-wrap'>
          <div className='title md:w-1/3 w-full'>
            <span className='text-green-800 font-bold text-2xl'>
              How can we help you?
            </span>
            <h1 className='text-4xl font-bold my-5'>Contact Us</h1>
            <p className='mt-10'>
              We're here to help and answer any questions you might have. We
              look forward to hearing from you!
            </p>
            <div className='icons mt-6 space-y-2'>
              <p className='flex items-center gap-4 '>
                <MdOutlinePhone size={30} /> 
                <a href='https://api.whatsapp.com/send?phone=201111473010' target='_blank'>01111473010</a>
              </p>
              <p className='flex items-center gap-4'>
                <MdOutlineEmail size={30} />
                <a href='mailto:Gamalhegy98@gmail.com'>E-mail</a>
              </p>
              <p className='flex items-center gap-4'>
                <FaInstagram size={30} />
                <a
                  href='https://www.instagram.com/zochy.eg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                  target='_blank'
                >
                  instagram
                </a>
              </p>
            </div>
          </div>
          <div className='md:w-1/2 w-full '>
            <img
              src={imgContactUs}
              alt=''
              width={'80%'}
              className='ml-auto bg-none'
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
