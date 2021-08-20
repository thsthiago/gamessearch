import Head from 'next/head'

type Props = {
  title: string
}

export const HeadComponent = ({ title }: Props) => (
  <Head>
    <title>Games search | {title}</title>
  </Head>
)
