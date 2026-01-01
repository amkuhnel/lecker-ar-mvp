export interface User {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    bio?: string;
    stats: {
        reviews: number;
        followers: number;
        following: number;
    };
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    venueId: string; // Added for navigation
    venueName: string;
    dishName: string;
    score: number;
    comment: string;
    imageUrl: string;
    images?: string[];
    location: string;
    timestamp: string;
    category: string;
    tags: string[];
    price?: string;
    serviceScore?: number;
    ambianceScore?: number;
    likes?: number;
}

export interface Venue {
    id: string;
    name: string;
    category: string;
    priceRange: string;
    rating: number;
    location: string;
    imageUrl: string;
}

export interface LocationPoint {
    id: string;
    name: string;
    address: string;
    isActive: boolean;
}
