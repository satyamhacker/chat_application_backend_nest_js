import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateGroupDto } from './dto/create-group.dto';

@ApiTags('Chats')
@ApiBearerAuth()
@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) { }

    @Post('group')
    @ApiOperation({ summary: 'Create a new chat group with transaction' })
    async createGroup(@Body() createGroupDto: CreateGroupDto, @Req() req: any) {
        // JWT Phase 3/4 ke baad yahan req.user se creator aayega.
        // For now dummy creator to keep API functional.
        const dummyCreator = {
            id: 'dummy-uuid',
            username: 'testuser',
        } as any;

        return this.chatsService.createGroup(
            createGroupDto.name,
            createGroupDto.description,
            dummyCreator,
        );
    }

    @Get('top')
    @ApiOperation({ summary: 'Get top 10 chat groups' })
    async getExploreGroups() {
        return this.chatsService.getTopGroups();
    }
}

