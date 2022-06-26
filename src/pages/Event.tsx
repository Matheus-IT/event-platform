import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Video } from '../components/Video';
import { GetLessonsQuery, useGetLessonsQuery } from '../graphql/generated';

interface Lesson {
	id: string;
	title: string;
	slug: string;
	availableAt: Date;
	type: 'live' | 'class';
}

function adaptToMyLessons(query: GetLessonsQuery) {
	let myLessons = [];
	for (let lesson of query.lessons) {
		myLessons.push({
			id: lesson.id,
			title: lesson.title,
			slug: lesson.slug,
			availableAt: lesson.availableAt,
			type: lesson.lessonType,
		});
	}
	return myLessons;
}

export function Event() {
	const { data } = useGetLessonsQuery();
	const { slug: currentLessonSlug } = useParams<{ slug: string }>();

	const lessons: Lesson[] = adaptToMyLessons(data ?? { lessons: [] });

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex flex-1">
				<Video lessonSlug={currentLessonSlug ?? ''} />
				{data ? <Sidebar lessons={lessons} /> : <div className="flex flex-1"></div>}
			</main>
		</div>
	);
}
