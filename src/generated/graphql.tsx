import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  album_type: Scalars['String'];
  artists: Array<Artist>;
  cover_image?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  release_date: Scalars['String'];
  tracks?: Maybe<Array<Track>>;
  type: EType;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: EType;
};

export enum EType {
  Album = 'ALBUM',
  Artist = 'ARTIST',
  Compilation = 'COMPILATION',
  Playlist = 'PLAYLIST',
  Single = 'SINGLE',
  Track = 'TRACK',
  User = 'USER'
}

export type Playlist = {
  __typename?: 'Playlist';
  cover_image?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  followers?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  public?: Maybe<Scalars['Boolean']>;
  total: Scalars['Int'];
  tracks: Array<PlaylistTrack>;
  type: EType;
};

export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  added_at: Scalars['String'];
  added_by: User;
  id: Scalars['ID'];
  track: Track;
};

export type Query = {
  __typename?: 'Query';
  album: Album;
  artist: Artist;
  followed_artists: Array<Artist>;
  liked_songs: Array<Track>;
  playlist: Playlist;
  playlists: Array<Playlist>;
  recently_played: Array<Track>;
  saved_albums: Array<Album>;
  top_tracks: Array<Track>;
  track: Track;
  user: User;
};


export type QueryAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryArtistArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};

export type Track = {
  __typename?: 'Track';
  album: Album;
  artists: Array<Artist>;
  cover_image?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  type: EType;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAlbumQuery = { __typename?: 'Query', album: { __typename?: 'Album', id: string, name: string, popularity?: number | null | undefined, release_date: string, tracks?: Array<{ __typename?: 'Track', id: string, name: string, cover_image?: string | null | undefined, artists: Array<{ __typename?: 'Artist', id: string, name: string }> }> | null | undefined } };

export type GetPlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id: string, name: string, total: number, duration: number, cover_image?: string | null | undefined, owner: { __typename?: 'User', id: string, name: string }, tracks: Array<{ __typename?: 'PlaylistTrack', id: string, added_at: string, track: { __typename?: 'Track', id: string, name: string, cover_image?: string | null | undefined, artists: Array<{ __typename?: 'Artist', id: string, name: string }>, album: { __typename?: 'Album', id: string, name: string, release_date: string } } }> } };

export type GetPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaylistsQuery = { __typename?: 'Query', playlists: Array<{ __typename?: 'Playlist', id: string, name: string, type: EType, cover_image?: string | null | undefined }> };

export type GetRecentlyPlayedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentlyPlayedQuery = { __typename?: 'Query', recently_played: Array<{ __typename?: 'Track', id: string, name: string, type: EType, cover_image?: string | null | undefined }> };

export type GetSavedAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedAlbumsQuery = { __typename?: 'Query', saved_albums: Array<{ __typename?: 'Album', id: string, name: string, type: EType, cover_image?: string | null | undefined }> };

export type GetTopTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopTracksQuery = { __typename?: 'Query', top_tracks: Array<{ __typename?: 'Track', id: string, name: string, type: EType, cover_image?: string | null | undefined }> };

export type GetTrackQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTrackQuery = { __typename?: 'Query', track: { __typename?: 'Track', id: string, name: string, cover_image?: string | null | undefined, duration: number, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, photoURL?: string | null | undefined } };


export const GetAlbumDocument = gql`
    query getAlbum($id: ID!) {
  album(id: $id) {
    id
    name
    popularity
    release_date
    tracks {
      id
      name
      cover_image
      artists {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
      }
export function useGetAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
        }
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<typeof useGetAlbumLazyQuery>;
export type GetAlbumQueryResult = Apollo.QueryResult<GetAlbumQuery, GetAlbumQueryVariables>;
export const GetPlaylistDocument = gql`
    query getPlaylist($id: ID!) {
  playlist(id: $id) {
    id
    name
    total
    duration
    cover_image
    owner {
      id
      name
    }
    tracks {
      id
      added_at
      track {
        id
        name
        cover_image
        artists {
          id
          name
        }
        album {
          id
          name
          release_date
        }
      }
    }
  }
}
    `;

/**
 * __useGetPlaylistQuery__
 *
 * To run a query within a React component, call `useGetPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaylistQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
      }
export function useGetPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
        }
export type GetPlaylistQueryHookResult = ReturnType<typeof useGetPlaylistQuery>;
export type GetPlaylistLazyQueryHookResult = ReturnType<typeof useGetPlaylistLazyQuery>;
export type GetPlaylistQueryResult = Apollo.QueryResult<GetPlaylistQuery, GetPlaylistQueryVariables>;
export const GetPlaylistsDocument = gql`
    query getPlaylists {
  playlists {
    id
    name
    type
    cover_image
  }
}
    `;

/**
 * __useGetPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
      }
export function useGetPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export type GetPlaylistsQueryHookResult = ReturnType<typeof useGetPlaylistsQuery>;
export type GetPlaylistsLazyQueryHookResult = ReturnType<typeof useGetPlaylistsLazyQuery>;
export type GetPlaylistsQueryResult = Apollo.QueryResult<GetPlaylistsQuery, GetPlaylistsQueryVariables>;
export const GetRecentlyPlayedDocument = gql`
    query getRecentlyPlayed {
  recently_played {
    id
    name
    type
    cover_image
  }
}
    `;

/**
 * __useGetRecentlyPlayedQuery__
 *
 * To run a query within a React component, call `useGetRecentlyPlayedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentlyPlayedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentlyPlayedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentlyPlayedQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentlyPlayedQuery, GetRecentlyPlayedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentlyPlayedQuery, GetRecentlyPlayedQueryVariables>(GetRecentlyPlayedDocument, options);
      }
export function useGetRecentlyPlayedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentlyPlayedQuery, GetRecentlyPlayedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentlyPlayedQuery, GetRecentlyPlayedQueryVariables>(GetRecentlyPlayedDocument, options);
        }
export type GetRecentlyPlayedQueryHookResult = ReturnType<typeof useGetRecentlyPlayedQuery>;
export type GetRecentlyPlayedLazyQueryHookResult = ReturnType<typeof useGetRecentlyPlayedLazyQuery>;
export type GetRecentlyPlayedQueryResult = Apollo.QueryResult<GetRecentlyPlayedQuery, GetRecentlyPlayedQueryVariables>;
export const GetSavedAlbumsDocument = gql`
    query getSavedAlbums {
  saved_albums {
    id
    name
    type
    cover_image
  }
}
    `;

/**
 * __useGetSavedAlbumsQuery__
 *
 * To run a query within a React component, call `useGetSavedAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSavedAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetSavedAlbumsQuery, GetSavedAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedAlbumsQuery, GetSavedAlbumsQueryVariables>(GetSavedAlbumsDocument, options);
      }
export function useGetSavedAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedAlbumsQuery, GetSavedAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedAlbumsQuery, GetSavedAlbumsQueryVariables>(GetSavedAlbumsDocument, options);
        }
export type GetSavedAlbumsQueryHookResult = ReturnType<typeof useGetSavedAlbumsQuery>;
export type GetSavedAlbumsLazyQueryHookResult = ReturnType<typeof useGetSavedAlbumsLazyQuery>;
export type GetSavedAlbumsQueryResult = Apollo.QueryResult<GetSavedAlbumsQuery, GetSavedAlbumsQueryVariables>;
export const GetTopTracksDocument = gql`
    query getTopTracks {
  top_tracks {
    id
    name
    type
    cover_image
  }
}
    `;

/**
 * __useGetTopTracksQuery__
 *
 * To run a query within a React component, call `useGetTopTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopTracksQuery(baseOptions?: Apollo.QueryHookOptions<GetTopTracksQuery, GetTopTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopTracksQuery, GetTopTracksQueryVariables>(GetTopTracksDocument, options);
      }
export function useGetTopTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopTracksQuery, GetTopTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopTracksQuery, GetTopTracksQueryVariables>(GetTopTracksDocument, options);
        }
export type GetTopTracksQueryHookResult = ReturnType<typeof useGetTopTracksQuery>;
export type GetTopTracksLazyQueryHookResult = ReturnType<typeof useGetTopTracksLazyQuery>;
export type GetTopTracksQueryResult = Apollo.QueryResult<GetTopTracksQuery, GetTopTracksQueryVariables>;
export const GetTrackDocument = gql`
    query getTrack($id: ID!) {
  track(id: $id) {
    id
    name
    cover_image
    duration
    artists {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTrackQuery__
 *
 * To run a query within a React component, call `useGetTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTrackQuery(baseOptions: Apollo.QueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
      }
export function useGetTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
        }
export type GetTrackQueryHookResult = ReturnType<typeof useGetTrackQuery>;
export type GetTrackLazyQueryHookResult = ReturnType<typeof useGetTrackLazyQuery>;
export type GetTrackQueryResult = Apollo.QueryResult<GetTrackQuery, GetTrackQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    name
    photoURL
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;