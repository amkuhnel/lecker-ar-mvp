import type { Review, Venue, User } from './types';

export const COLORS = {
    primary: '#f48c25',
    background: '#000000',
    surface: '#121212',
    textMuted: '#9CA3AF'
};

export const MOCK_USER: User = {
    id: 'u1',
    name: 'Andrés Kuhne',
    handle: 'Shadowlynx',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    bio: 'Amante de la gastronomía urbana y el café de especialidad.',
    stats: {
        reviews: 700,
        followers: 120,
        following: 45
    }
};

export const MOCK_USERS: User[] = [
    MOCK_USER,
    {
        id: 'u2',
        name: 'Marina Fernández',
        handle: 'Marina_Eats',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        bio: 'Buscando la mejor pizza de Buenos Aires. 🍕',
        stats: {
            reviews: 42,
            followers: 850,
            following: 120
        }
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: 'r1',
        userId: 'u1',
        userName: 'Shadowlynx',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
        venueId: 'v-cabrera',
        venueName: 'La Cabrera',
        dishName: 'Ojo de Bife',
        score: 9.5,
        comment: 'Increíble punto de cocción. Se deshace en la boca. Recomendado para compartir.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhBgwFjVQdD-J1vXLEzEyausX0bEz55uPQ4xLfSoIMcG1cWjqHb4JHqRAqn7JhLgcGM0Bj4jsclturg1Ksx1G7cLLs1JxQUk4Vaihlt8dTLet6QGG1cIahFMe7OuHvjafYax9w6wBXwAScWF_rgMXdZPo_K9JrFq5vgd9nO3YJAsMdau92lol9XevTOkSY6QtY1qBRTzwuxi39dgS-fC3P5CdLJVZgtcasyjK0nAYP6Vg5S9epa-_ky_v4jJ715SxIUxj5inC2nDw',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDhBgwFjVQdD-J1vXLEzEyausX0bEz55uPQ4xLfSoIMcG1cWjqHb4JHqRAqn7JhLgcGM0Bj4jsclturg1Ksx1G7cLLs1JxQUk4Vaihlt8dTLet6QGG1cIahFMe7OuHvjafYax9w6wBXwAScWF_rgMXdZPo_K9JrFq5vgd9nO3YJAsMdau92lol9XevTOkSY6QtY1qBRTzwuxi39dgS-fC3P5CdLJVZgtcasyjK0nAYP6Vg5S9epa-_ky_v4jJ715SxIUxj5inC2nDw'],
        location: 'Palermo Soho',
        timestamp: 'Hace 2 días',
        category: 'Parrilla',
        tags: ['Carne', 'Clásico', 'Especialidad'],
        price: '24500',
        serviceScore: 5.0,
        ambianceScore: 4.8,
        likes: 24
    },
    {
        id: 'r2',
        userId: 'u2',
        userName: 'Marina_Eats',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        venueId: 'v1',
        venueName: 'Siamo nel Forno',
        dishName: 'Pizza Margherita',
        score: 9.2,
        comment: 'La masa fermentada 48hs hace la diferencia. Muy recomendada.',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
        location: 'Palermo Hollywood',
        timestamp: 'Hace 4 horas',
        category: 'Italiana',
        tags: ['Pizza', 'Horno de Leña', 'Pet friendly'],
        price: '12000',
        serviceScore: 4.5,
        ambianceScore: 4.0,
        likes: 18
    }
];

export const MOCK_VENUES: Venue[] = [
    {
        id: 'v-cabrera',
        name: 'La Cabrera',
        category: 'Parrilla',
        priceRange: '$$$',
        rating: 4.8,
        location: 'José A. Cabrera 5099, Palermo',
        imageUrl: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800'
    },
    {
        id: 'v1',
        name: 'Burger & Co.',
        category: 'Americana',
        priceRange: '$$',
        rating: 4.9,
        location: 'Palermo Soho',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800'
    }
];
