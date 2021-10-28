import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = Tile & {
  __typename?: 'Album';
  album_type: Scalars['String'];
  artists: Array<Artist>;
  cover_image?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  genres?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  numberOfTracks?: Maybe<Scalars['Int']>;
  popularity?: Maybe<Scalars['Int']>;
  release_date: Scalars['String'];
  tracks?: Maybe<Array<Track>>;
  type: EType;
  uri: Scalars['String'];
};

export type Artist = Tile & {
  __typename?: 'Artist';
  albums: Array<Album>;
  cover_image?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  tracks: Array<Track>;
  type: EType;
  uri: Scalars['String'];
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

export type Playlist = Tile & {
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
  uri: Scalars['String'];
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
  new_releases: Array<Album>;
  playlist: Playlist;
  playlists: Array<Playlist>;
  recently_played: Array<Track>;
  recommendation: Array<Track>;
  saved_albums: Array<Album>;
  search: Array<Search>;
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


export type QuerySearchArgs = {
  query: Scalars['String'];
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};

export type Search = Tile & {
  __typename?: 'Search';
  artist_name?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: EType;
};

export type Tile = {
  cover_image?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: EType;
};

export type Track = Tile & {
  __typename?: 'Track';
  album?: Maybe<Album>;
  artists: Array<Artist>;
  cover_image?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  type: EType;
  uri: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Album: ResolverTypeWrapper<Album>;
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EType: EType;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Playlist: ResolverTypeWrapper<Playlist>;
  PlaylistTrack: ResolverTypeWrapper<PlaylistTrack>;
  Query: ResolverTypeWrapper<{}>;
  Search: ResolverTypeWrapper<Search>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tile: ResolversTypes['Album'] | ResolversTypes['Artist'] | ResolversTypes['Playlist'] | ResolversTypes['Search'] | ResolversTypes['Track'];
  Track: ResolverTypeWrapper<Track>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Album: Album;
  Artist: Artist;
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Playlist: Playlist;
  PlaylistTrack: PlaylistTrack;
  Query: {};
  Search: Search;
  String: Scalars['String'];
  Tile: ResolversParentTypes['Album'] | ResolversParentTypes['Artist'] | ResolversParentTypes['Playlist'] | ResolversParentTypes['Search'] | ResolversParentTypes['Track'];
  Track: Track;
  User: User;
};

export type AlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  album_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfTracks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracks?: Resolver<Maybe<Array<ResolversTypes['Track']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  albums?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']> = {
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  public?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['PlaylistTrack']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistTrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaylistTrack'] = ResolversParentTypes['PlaylistTrack']> = {
  added_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  added_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  track?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  album?: Resolver<ResolversTypes['Album'], ParentType, ContextType, RequireFields<QueryAlbumArgs, 'id'>>;
  artist?: Resolver<ResolversTypes['Artist'], ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  followed_artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  liked_songs?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  new_releases?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType>;
  playlist?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType, RequireFields<QueryPlaylistArgs, 'id'>>;
  playlists?: Resolver<Array<ResolversTypes['Playlist']>, ParentType, ContextType>;
  recently_played?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  recommendation?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  saved_albums?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType>;
  search?: Resolver<Array<ResolversTypes['Search']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  top_tracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  track?: Resolver<ResolversTypes['Track'], ParentType, ContextType, RequireFields<QueryTrackArgs, 'id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type SearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = {
  artist_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tile'] = ResolversParentTypes['Tile']> = {
  __resolveType: TypeResolveFn<'Album' | 'Artist' | 'Playlist' | 'Search' | 'Track', ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
};

export type TrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Album?: AlbumResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  Playlist?: PlaylistResolvers<ContextType>;
  PlaylistTrack?: PlaylistTrackResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  Tile?: TileResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

