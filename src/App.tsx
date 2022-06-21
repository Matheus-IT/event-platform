import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { client } from './lib/apollo';

const GET_LESSONS_QUERY = gql`
	query {
		lessons {
			id
			title
		}
	}
`

interface Lesson {
	id: string;
	title: string;
}

function App() {
	// Old implementation:
	//useEffect(() => {
	//	client.query({
	//		query: GET_LESSONS_QUERY
	//	}).then(res => {
	//		console.log(res.data);
	//	});
	//}, []);
	// New implementation:
	const { data } = useQuery(GET_LESSONS_QUERY);
	
  return <ul>
		{data?.lessons.map((lesson: Lesson) => {
			return <li key={lesson.id}>{lesson.title}</li>
		})}
	</ul>;
}

export default App;
