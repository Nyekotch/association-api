import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';
import { ForumPostsService } from '../forum_posts.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly forumPostsService: ForumPostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const postId = request.params.id;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Admin et modérateur peuvent tout modifier
    if (user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR) {
      return true;
    }

    // Récupérer le post pour vérifier l'auteur
    const post = await this.forumPostsService.findOne(postId);
    
    if (!post) {
      throw new ForbiddenException('Post not found');
    }

    // Vérifier si l'utilisateur est l'auteur du post
    if (post.authorid === user.id) {
      return true;
    }

    throw new ForbiddenException('You can only modify your own posts');
  }
}
