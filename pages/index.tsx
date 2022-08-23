import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <div></div>
}

export default Home;

export const getServerSideProps = async () => {

  return {
    redirect: {
      destination: '/countries'
    }
  }
}
