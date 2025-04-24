// CSS Module
import { ReactNode, useEffect } from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import books from '@/mock/books.json';
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";


/**
 * getServerSideProps 이름 자체가 nextjs에서 약속된 함수 이름이다.
 * 이렇게 하면 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러온다.
 * 
 * 아래 return 문을 통해 Home 컴포넌트에 해당 props를 전달하게 되는데,
 * props 라는 이름을 할당해야한다.
 * 
 * 아래 함수 이름과 return형식은 약속된 내용이므로, 문법이라고 생각하고 쓰면 된다.
 * 
 * 해당 내용은 SSR로써, 서버에서 일어나는 일이기 때문에 console.log가 브라우저가 아닌 서버 콘솔에 찍히게 된다
 */
export const getServerSideProps = async() => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }
};

export default function Home({
  allBooks,
  recoBooks
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(allBooks);
  console.log(recoBooks);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
