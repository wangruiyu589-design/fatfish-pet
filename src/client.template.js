/**
 * @local/fatfish-pet — Client half.
 *
 * Plain-JS Client module for the Harness Web UI. `build.mjs` inlines the SVG
 * artwork and its CSS into the two marker slots below. All artwork is rendered
 * inline so the expression/action classes can animate it; the UI around it uses
 * only host theme tokens.
 */
window.__ModuleLoader__.load({
  id: '@local/fatfish-pet',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useRef, useEffect, useCallback, Fragment } = React

    const BUILD_TIME = __BUILD_TIME__

    const STORE_KEY = 'dsh.fatfish-pet.state.v1'
    const SIZE = 196
    const MIN_Y = 56
    // The Live2D body is mounted on a viewport-sized floor: its own walk/run
    // physics carry her across the screen. The kit keeps this inset around the
    // figure (104 logo units * scale + 8px), so her center never leaves it.
    const LIVE_SCALE = 0.68
    const LIVE_INSET = Math.round(104 * LIVE_SCALE + 8)
    const LIVE_FLOOR_PAD = 12
    const LIVE_EMOTION = {
      normal: 'neutral', happy: 'happy', love: 'love', shy: 'shy',
      curious: 'confused', thinking: 'thinking', sleepy: 'sleepy',
      hungry: 'worried', surprised: 'surprised', annoyed: 'angry',
      sad: 'sad', proud: 'smug', dizzy: 'dizzy',
      wink: 'wink', excited: 'excited', flustered: 'flustered',
      pout: 'pout', smug: 'smug', worried: 'worried',
      determined: 'determined', scared: 'scared', cry: 'cry', content: 'content',
    }
    const LIVE_ACTION = {
      wiggle: 'dance', spin: 'dance', bounce: 'dance', shake: 'shake', nod: 'nod',
      wave: 'wave', bow: 'bow', dance: 'dance', hop: 'dance', jump: 'jump',
      sit: 'sit', look: 'look', shiver: 'shiver', flap: 'wave',
      heart: 'love', shy: 'shy', yawn: 'sleepy', angry: 'angry', stretch: 'happy',
    }

    const EMOTIONS = new Set([
      'normal', 'happy', 'love', 'shy', 'curious', 'thinking', 'sleepy',
      'hungry', 'surprised', 'annoyed', 'sad', 'proud', 'dizzy',
      'wink', 'excited', 'flustered', 'pout', 'smug', 'worried',
      'determined', 'scared', 'cry', 'content',
    ])
    const ACTIONS = new Set([
      'none', 'wiggle', 'spin', 'bounce', 'shake', 'nod',
      'wave', 'bow', 'dance', 'hop', 'jump', 'sit', 'look', 'shiver', 'flap',
      'heart', 'shy', 'yawn', 'angry', 'stretch',
    ])

    const ZH_TEXT = {
      'meta.title': '大肥鱼桌宠',
      'ui.chat': '聊天',
      'ui.feed': '投喂',
      'ui.play': '玩尾巴',
      'ui.sleep': '打盹',
      'ui.wake': '叫醒',
      'ui.settings': '设置',
      'ui.close': '收起',
      'ui.send': '发送',
      'ui.online': 'DeepSeek 在线',
      'ui.local': '本地摸鱼模式',
      'ui.thinking': '正在摇尾巴…',
      'ui.placeholder': '跟大肥鱼说点什么…',
      'ui.footHint': 'Enter 发送 · Esc 收起 · Alt+Shift+C 随时找她 · /agent 让她帮忙',
      'ui.agent': '让她帮忙',
      'ui.hunger': '饱腹',
      'ui.energy': '精力',
      'ui.mood': '心情',
      'ui.affinity': '羁绊',
      'ui.wander': '自由游动',
      'ui.quiet': '少说点话',
      'ui.speak': '念出来',
      'ui.mic': '语音输入',
      'ui.listening': '在听…',
      'ui.micError': '没听清，再说一次？',
      'ui.actions': '动作',
      'menu.actions': '逗她做动作…',
      'menu.agent': '让她想想办法',
      'agent.askTitle': '想让她帮你做什么？',
      'agent.askPlaceholder': '例如：看看工作区里有什么 / 帮我理一下下一步 / 25 分钟后提醒我休息',
      'agent.askHint': '她当前权限：',
      'agent.quickWorkspace': '看看工作区',
      'agent.quickPlan': '帮我理思路',
      'agent.quickRemind': '提醒我休息',
      'agent.start': '开始',
      'agent.cancel': '取消',
      'action.wave': '挥手',
      'action.bow': '鞠躬',
      'action.spin': '转圈',
      'action.dance': '跳舞',
      'action.hop': '跳一下',
      'action.sit': '坐下',
      'action.look': '东张西望',
      'action.flap': '扑腾',
      'action.shiver': '发抖',
      'action.jump': '蹦高',
      'action.heart': '送心心',
      'action.shy': '害羞',
      'action.yawn': '打哈欠',
      'action.angry': '生气',
      'action.stretch': '伸懒腰',
      'ui.petName': '我的名字',
      'ui.userName': '你的称呼',
      'ui.save': '保存',
      'ui.cancel': '取消',
      'ui.clearChat': '清空对话',
      'ui.hide': '藏起来',
      'ui.summon': '召唤大肥鱼',
      'ui.rename': '改名字',
      'ui.aiFallback': 'DeepSeek 没接上，先切到鱼的直觉',
      'ui.hiddenHint': '大肥鱼藏好了 · 点右下角「召唤大肥鱼」或按 Alt+Shift+F',
      'ui.welcomeBack': '欢迎回来',
      'name.userDefault': '饲养员',
      'name.petDefault': '大肥鱼',
      'aff.0': '刚认识',
      'aff.1': '有点眼熟',
      'aff.2': '好朋友',
      'aff.3': '贴贴',
      'aff.4': '灵魂鱼友',
      'menu.chat': '陪她聊聊',
      'menu.feed': '投喂白饭',
      'menu.play': '玩会儿鲸尾',
      'menu.sleep': '哄她打盹',
      'menu.wake': '把她叫醒',
      'menu.rename': '给她取个名字',
      'menu.wanderOn': '自由游动：开',
      'menu.wanderOff': '自由游动：关',
      'menu.zoomIn': '放大一点',
      'menu.zoomOut': '缩小一点',
      'menu.zoomReset': '恢复大小',
      'menu.quietOn': '少说点话：开',
      'menu.quietOff': '少说点话：关',
      'menu.hide': '藏起来',
      'err.empty': '你好像什么都没说，再试一次？',
    }

    const EN_TEXT = {
      'meta.title': 'Big Fish Pet',
      'ui.chat': 'Chat',
      'ui.feed': 'Feed',
      'ui.play': 'Play',
      'ui.sleep': 'Nap',
      'ui.wake': 'Wake',
      'ui.settings': 'Settings',
      'ui.close': 'Close',
      'ui.send': 'Send',
      'ui.online': 'DeepSeek online',
      'ui.local': 'Local fish mode',
      'ui.thinking': 'Wagging…',
      'ui.placeholder': 'Say something to Big Fish…',
      'ui.footHint': 'Enter to send · Esc to close · Alt+Shift+C to summon · /agent to task her',
      'ui.agent': 'Ask her to help',
      'ui.hunger': 'Full',
      'ui.energy': 'Energy',
      'ui.mood': 'Mood',
      'ui.affinity': 'Bond',
      'ui.wander': 'Free swim',
      'ui.quiet': 'Less chatter',
      'ui.speak': 'Speak replies',
      'ui.mic': 'Voice input',
      'ui.listening': 'Listening…',
      'ui.micError': 'Did not catch that — try again?',
      'ui.actions': 'Actions',
      'menu.actions': 'Ask for a trick…',
      'action.wave': 'Wave',
      'action.bow': 'Bow',
      'action.spin': 'Spin',
      'action.dance': 'Dance',
      'action.hop': 'Hop',
      'action.sit': 'Sit',
      'action.look': 'Look around',
      'action.flap': 'Flap',
      'action.shiver': 'Shiver',
      'action.jump': 'Jump',
      'action.heart': 'Send hearts',
      'action.shy': 'Shy',
      'action.yawn': 'Yawn',
      'action.angry': 'Huff',
      'action.stretch': 'Stretch',
      'ui.petName': 'Pet name',
      'ui.userName': 'Call me',
      'ui.save': 'Save',
      'ui.cancel': 'Cancel',
      'ui.clearChat': 'Clear chat',
      'ui.hide': 'Hide',
      'ui.summon': 'Summon Big Fish',
      'ui.rename': 'Rename',
      'ui.aiFallback': 'DeepSeek is unreachable — using fish instincts',
      'ui.hiddenHint': 'Big Fish hidden · click “Summon Big Fish” at the bottom right or press Alt+Shift+F',
      'ui.welcomeBack': 'Welcome back',
      'name.userDefault': 'keeper',
      'name.petDefault': 'Big Fish',
      'aff.0': 'New friend',
      'aff.1': 'Familiar',
      'aff.2': 'Good friends',
      'aff.3': 'Snuggly',
      'aff.4': 'Soul fish',
      'menu.chat': 'Talk with her',
      'menu.feed': 'Feed rice',
      'menu.play': 'Play with the tail',
      'menu.sleep': 'Tuck her in',
      'menu.wake': 'Wake her up',
      'menu.rename': 'Give her a name',
      'menu.wanderOn': 'Free swim: on',
      'menu.wanderOff': 'Free swim: off',
      'menu.zoomIn': 'Zoom in',
      'menu.zoomOut': 'Zoom out',
      'menu.zoomReset': 'Reset zoom',
      'menu.quietOn': 'Less chatter: on',
      'menu.quietOff': 'Less chatter: off',
      'menu.hide': 'Hide',
      'err.empty': 'You did not say anything — try again?',
    }

    // ---------------------------------------------------------------------
    // Small utilities
    // ---------------------------------------------------------------------

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
    const rand = (min, max) => min + Math.random() * (max - min)
    const pick = (list) => list[Math.floor(Math.random() * list.length)]
    const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

    // ---------------------------------------------------------------------
    // Personality presets: the same body, very different tempers.
    // ---------------------------------------------------------------------
    const PERSONAS = {
      gentle: {
        label: '温柔体贴',
        desc: '先照顾你的情绪，生气了也只是小声委屈，最好哄。',
        angerMul: .75, clingy: 1, warpMul: .3, talk: 1.05,
        ocean: { O: 55, C: 60, E: 50, A: 85, N: 35 },
        click: ['嗯？我在呢。', '怎么啦，慢慢说。', '要摸摸头吗？', '我一直都在呀。'],
        idle: ['今天也一起加油吧。', '累了就靠一会儿吧。', '我在这儿陪着你。'],
        angry: ['我……有点难过。', '你都不看我一眼。', '呜……不理你了。'],
      },
      tsundere: {
        label: '傲娇嘴硬',
        desc: '嘴上凶你，心里在意；吃软不吃硬，被夸会别过脸。',
        angerMul: 1, clingy: .8, warpMul: .8, talk: 1,
        ocean: { O: 60, C: 50, E: 55, A: 45, N: 55 },
        click: ['哼，才不是在等你。', '干、干嘛突然摸我。', '别误会，我只是刚好站这儿。', '……手感还行吧。'],
        idle: ['我才没有在看你。', '你忙你的，我又不无聊。', '哼，还不来陪我。'],
        angry: ['哼！谁要理你。', '别碰我！', '你走开啦。'],
      },
      genki: {
        label: '元气活泼',
        desc: '话多爱玩，情绪来得快去得也快，最喜欢热闹。',
        angerMul: .85, clingy: 1.1, warpMul: .4, talk: 1.35,
        ocean: { O: 75, C: 40, E: 85, A: 70, N: 45 },
        click: ['哇！被你摸到啦！', '嘿嘿，再来一下！', '今天也超有精神！', '我们一起玩吧！'],
        idle: ['要不要一起玩！', '我刚刚追到自己的尾巴了！', '好想出去玩呀！'],
        angry: ['哼！我不跟你玩了！', '啊——气死我了！', '除非你道歉！'],
      },
      cool: {
        label: '冷淡高冷',
        desc: '话少、边界感强，好感要慢慢攒，一旦亲近就很稳。',
        angerMul: 1.15, clingy: .5, warpMul: .15, talk: .65,
        ocean: { O: 55, C: 70, E: 25, A: 50, N: 40 },
        click: ['……嗯。', '有事就说。', '不用一直摸。', '知道了。'],
        idle: ['……', '别盯着我看。', '安静一点。'],
        angry: ['……随你。', '我现在不想说话。', '离远一点。'],
      },
      yandere: {
        label: '病娇潜质',
        warn: '占有欲很强，可能会锁住你的屏幕。',
        desc: '甜蜜又危险，被忽略容易扭曲，需要多一点回应。',
        angerMul: 1.3, clingy: 1.3, warpMul: 2, talk: 1.1,
        ocean: { O: 60, C: 45, E: 55, A: 40, N: 80 },
        click: ['你刚才在看谁？', '只准摸我。', '一直在你身边，好不好？', '不要离开我的视线。'],
        idle: ['你在做什么？我可以看着吗？', '不要离开我视线。', '只要看着我就好。'],
        angry: ['你为什么不理我。', '是不是有别人了？', '……我会让你看着我的。'],
      },
    }
    // Mood stages own the expression pool: only faces of the CURRENT stage may
    // appear. When the stage changes, the previous pool is gone for good.
    const MOOD_STAGES = {
      joyful: { label: '雀跃', faces: ['happy', 'excited', 'wink', 'love', 'proud', 'smug'], motions: ['dance', 'hop', 'wave', 'heart'] },
      calm: { label: '平静', faces: ['content', 'wink', 'curious', 'normal', 'shy'], motions: ['look', 'nod', 'wave'] },
      low: { label: '低落', faces: ['sad', 'pout', 'worried', 'sleepy', 'cry'], motions: ['sit', 'look', 'nod'] },
      angry: { label: '生气', faces: ['annoyed', 'angry', 'pout', 'determined'], motions: ['shake', 'look'] },
      shy: { label: '害羞', faces: ['shy', 'flustered', 'wink', 'love'], motions: ['shiver', 'nod'] },
      clingy: { label: '黏人', faces: ['love', 'happy', 'shy', 'content'], motions: ['look', 'wave', 'heart'] },
      scared: { label: '不安', faces: ['scared', 'worried', 'surprised'], motions: ['shiver', 'look'] },
    }
    // Speaking style: the same intent gets a persona-appropriate face + gesture,
    // so the mouth, eyes and body always tell the same story.
    // Shyness is where personalities differ most: a tsundere denies it, a kuudere
    // barely shows it, a genki laughs it off, a yandere claims you. No default "shiver".
    // Every action-panel button gets a persona-specific delivery: face, gesture, lines.
    const PERSONA_ACTIONS = {
      gentle: {
        wave: { face: 'happy', action: 'wave', lines: ['我在这里。', '早上好呀。'] },
        bow: { face: 'shy', action: 'nod', lines: ['那就…礼貌一点。', '请多关照。'] },
        dance: { face: 'happy', action: 'dance', lines: ['一起来活动一下？', '我跳得还行吧？'] },
        heart: { face: 'love', action: 'wave', lines: ['最喜欢你了。', '给你一个抱抱。'] },
        shy: { face: 'shy', action: 'look', lines: ['唔…别一直看。', '这样有点害羞。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['有点困了…', '可以靠一会儿吗。'] },
        angry: { face: 'sad', action: 'look', lines: ['我有点难过。', '你都不理我。'] },
        sit: { face: 'content', action: 'sit', lines: ['坐一会儿吧。', '这样很安心。'] },
        look: { face: 'curious', action: 'look', lines: ['你在看什么？', '怎么了？'] },
      },
      tsundere: {
        wave: { face: 'smug', action: 'look', lines: ['哼，看什么看。', '才不是特意等你的。'] },
        bow: { face: 'flustered', action: 'shake', lines: ['干嘛突然这么正式。', '别、别鞠躬啊。'] },
        dance: { face: 'smug', action: 'look', lines: ['想看就直说嘛。', '跳得一般般啦。'] },
        heart: { face: 'flustered', action: 'look', lines: ['谁、谁要给你这个。', '只此一次。'] },
        shy: { face: 'flustered', action: 'look', lines: ['别、别误会。', '你摸够了没有。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['困了也不行吗。', '就眯一下下。'] },
        angry: { face: 'angry', action: 'shake', lines: ['哼，不理你了。', '你才知道啊。'] },
        sit: { face: 'content', action: 'sit', lines: ['坐着总可以吧。', '别靠太近。'] },
        look: { face: 'annoyed', action: 'look', lines: ['看什么。', '有事就说。'] },
      },
      genki: {
        wave: { face: 'excited', action: 'wave', lines: ['嗨嗨！', '我在这儿！'] },
        bow: { face: 'happy', action: 'nod', lines: ['敬礼！', '收到收到！'] },
        dance: { face: 'excited', action: 'dance', lines: ['一起蹦！', '看我的！'] },
        heart: { face: 'love', action: 'dance', lines: ['最喜欢你啦！', '给你超级大心心！'] },
        shy: { face: 'wink', action: 'wiggle', lines: ['嘿嘿，害羞！', '再来一次！'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['电量不足…', '睡五分钟！'] },
        angry: { face: 'angry', action: 'shake', lines: ['哼！不跟你玩了！', '生气了！'] },
        sit: { face: 'content', action: 'sit', lines: ['休息休息！', '坐这儿！'] },
        look: { face: 'curious', action: 'look', lines: ['欸？在干嘛？', '我也要看！'] },
      },
      cool: {
        wave: { face: 'content', action: 'nod', lines: ['嗯。', '看到了。'] },
        bow: { face: 'content', action: 'nod', lines: ['不必这么客气。', '知道了。'] },
        dance: { face: 'content', action: 'look', lines: ['……随便动动。', '不必期待。'] },
        heart: { face: 'shy', action: 'look', lines: ['……收下。', '别声张。'] },
        shy: { face: 'shy', action: 'look', lines: ['……别这样。', '（别过头）'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['困了。', '安静一会儿。'] },
        angry: { face: 'annoyed', action: 'look', lines: ['……无聊。', '适可而止。'] },
        sit: { face: 'content', action: 'sit', lines: ['这里就好。', '别打扰。'] },
        look: { face: 'curious', action: 'look', lines: ['……怎么了。', '说吧。'] },
      },
      yandere: {
        wave: { face: 'happy', action: 'look', lines: ['你回来了。', '一直看着你哦。'] },
        bow: { face: 'love', action: 'look', lines: ['只对你这样。', '你要负责。'] },
        dance: { face: 'love', action: 'dance', lines: ['只给你看。', '好看吗？'] },
        heart: { face: 'love', action: 'wave', lines: ['最喜欢你了。', '只喜欢我一个。'] },
        shy: { face: 'flustered', action: 'look', lines: ['只准摸我。', '……再摸一下。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['别走开…', '就在这里睡。'] },
        angry: { face: 'angry', action: 'shake', lines: ['你又看别人了。', '不准离开。'] },
        sit: { face: 'love', action: 'sit', lines: ['坐我旁边。', '就这样别动。'] },
        look: { face: 'curious', action: 'look', lines: ['你在想谁？', '看着我。'] },
      },
    }
    const PERSONA_SHY = {
      gentle: { face: 'shy', action: 'look', lines: ['唔…被摸头了。', '嘿嘿，好舒服。', '别、别摸那么久啦。'] },
      tsundere: { face: 'flustered', action: 'look', lines: ['别、别误会，我才没有高兴。', '你、你摸够了没有。', '哼，就一下下。'] },
      genki: { face: 'wink', action: 'wiggle', lines: ['嘿嘿，摸头！', '再来一次！', '好耶！'] },
      cool: { face: 'shy', action: 'look', lines: ['……嗯。', '别一直摸。', '（轻轻别过头）'] },
      yandere: { face: 'love', action: 'look', lines: ['只准摸我。', '再多摸一会儿。', '嘿嘿……'] },
    }
    const PERSONA_TAIL = {
      gentle: { face: 'flustered', action: 'look', lines: ['尾、尾巴不行…', '那里很敏感的。', '呀…别碰。'] },
      tsundere: { face: 'flustered', action: 'shake', lines: ['你、你摸哪呢！', '尾巴不行！听到没有！', '再摸我生气了！'] },
      genki: { face: 'surprised', action: 'jump', lines: ['呀！痒！', '哈哈别挠！', '尾巴会跳起来的！'] },
      cool: { face: 'annoyed', action: 'look', lines: ['……手拿开。', '别碰尾巴。', '（冷冷地看）'] },
      yandere: { face: 'love', action: 'look', lines: ['尾巴只给你摸。', '……再摸一下。', '只准你碰。'] },
    }
    const PERSONA_SPEECH = {
      gentle: { greet: ['happy', 'wave'], happy: ['happy', 'nod'], sad: ['sad', 'sit'], angry: ['sad', 'shiver'], shy: ['shy', 'shiver'], love: ['love', 'wave'], proud: ['proud', 'nod'], hungry: ['hungry', 'look'], tease: ['happy', 'wiggle'], surprise: ['surprised', 'hop'] },
      tsundere: { greet: ['smug', 'nod'], happy: ['smug', 'look'], sad: ['pout', 'sit'], angry: ['angry', 'shake'], shy: ['flustered', 'shiver'], love: ['shy', 'look'], proud: ['smug', 'nod'], hungry: ['pout', 'look'], tease: ['annoyed', 'shake'], surprise: ['surprised', 'hop'] },
      genki: { greet: ['excited', 'wave'], happy: ['excited', 'dance'], sad: ['sad', 'sit'], angry: ['angry', 'shake'], shy: ['happy', 'wiggle'], love: ['love', 'dance'], proud: ['proud', 'dance'], hungry: ['hungry', 'look'], tease: ['excited', 'hop'], surprise: ['surprised', 'hop'] },
      cool: { greet: ['content', 'nod'], happy: ['content', 'nod'], sad: ['sad', 'look'], angry: ['annoyed', 'look'], shy: ['shy', 'look'], love: ['content', 'nod'], proud: ['proud', 'nod'], hungry: ['content', 'look'], tease: ['annoyed', 'look'], surprise: ['surprised', 'look'] },
      yandere: { greet: ['happy', 'look'], happy: ['happy', 'look'], sad: ['sad', 'sit'], angry: ['angry', 'shake'], shy: ['flustered', 'shiver'], love: ['love', 'look'], proud: ['smug', 'nod'], hungry: ['worried', 'look'], tease: ['pout', 'shake'], surprise: ['surprised', 'hop'] },
    }
    const INTENT_EMOTION = {
      greet: 'happy', happy: 'happy', sad: 'sad', angry: 'annoyed', shy: 'shy',
      love: 'love', proud: 'proud', hungry: 'hungry', tease: 'happy',
      surprise: 'surprised', tired: 'sleepy', sorry: 'sad', think: 'thinking',
    }
    const EMOTION_ACTION = {
      happy: 'nod', excited: 'hop', wink: 'nod', love: 'wave', proud: 'nod', smug: 'look',
      shy: 'shiver', flustered: 'shiver', content: 'look', normal: 'look',
      sad: 'sit', cry: 'sit', pout: 'look', worried: 'shiver', sleepy: 'sit',
      annoyed: 'look', angry: 'shake', determined: 'nod', surprised: 'hop',
      scared: 'shiver', dizzy: 'shake', thinking: 'look', hungry: 'look', curious: 'look',
    }
    const inferSpeechIntent = (text) => {
      const t = String(text || '')
      if (/你好|回来|早安|晚安|晚上好|欢迎/.test(t)) return 'greet'
      if (/喜欢|爱你|抱抱|贴贴|最喜欢/.test(t)) return 'love'
      if (/对不起|抱歉|原谅|错了/.test(t)) return 'sorry'
      if (/呜|难过|委屈|无聊|唉|疼|哭|伤心|没精神/.test(t)) return 'sad'
      if (/哼|讨厌|走开|生气|气死|烦|不理你/.test(t)) return 'angry'
      if (/害羞|脸红|别碰|别摸|摸头|呀|唔/.test(t)) return 'shy'
      if (/厉害|当然|夸|得意|嘿嘿/.test(t)) return 'proud'
      if (/饿|白饭|吃|饭/.test(t)) return 'hungry'
      if (/困|睡|打盹|哈欠/.test(t)) return 'tired'
      if (/哇|惊|吓|突然/.test(t)) return 'surprise'
      if (/逗|玩|追|尾巴/.test(t)) return 'tease'
      return 'happy'
    }
    const PERSONA_KEYS = ['gentle', 'tsundere', 'genki', 'cool', 'yandere']
    const FAVOR_LABELS = [
      [0, 24, '冰冷'], [24, 40, '疏远'], [40, 55, '有点冷淡'],
      [55, 70, '熟悉'], [70, 85, '亲近'], [85, 101, '黏人'],
    ]
    const favorLabel = (favor) => {
      for (const [low, high, label] of FAVOR_LABELS) if (favor >= low && favor < high) return label
      return '熟悉'
    }
    const makeSoul = (saved = null) => {
      const base = {
        favor: 60,
        persona: null,
        customPersona: '',
        configured: false,
        traits: { closeness: 14, jealousy: 8, dependence: 10 },
        // A small OCEAN personality model with continuous mood, needs and a learned
        // picture of the user. These co-evolve so the same pet behaves differently
        // with different people and after different histories.
        ocean: { O: 55, C: 55, E: 55, A: 55, N: 50 },
        mood: { valence: 14, arousal: 42, stress: 12 },
        needs: { belonging: 62, autonomy: 55, competence: 55 },
        relation: { trust: 55, resentment: 0, security: 58 },
        userModel: { responsiveness: 50, care: 50, presence: 50, activeHours: {}, updatedAt: 0 },
        appraisal: { pet: .6, feed: .5, play: .55, chat: .45, dismiss: .9, ignore: .8, help: .55, drag: .4, work: .3 },
        emotion: 'content',
        emotionIntensity: 40,
        moodStage: 'calm',
        stageSince: 0,
        stageOverride: '',
        stageOverrideUntil: 0,
        lastMoodMotionAt: 0,
        fallingUntil: 0,
        fallHeavy: false,
        dragCount: 0,
        lastDragAt: 0,
        lastTailAt: 0,
        agentRuns: 0,
        lastAgentAt: 0,
        beliefs: [],
        selfNarrative: '',
        reflections: 0,
        lastReflectAt: 0,
        eventsSinceReflect: 0,
        reflectionBusy: false,
        brainCount: 0,
        forwardedCount: 0,
        lastBrainAt: 0,
        lastForwardAt: 0,
        lastMoodActionAt: 0,
        lastMoodSayAt: 0,
        lastDecayAt: 0,
        memory: [],
        warped: false,
        angryUntil: 0,
        ignoreUntil: 0,
        lastInteractionAt: Date.now(),
        lastOfferAt: 0,
        lastLockAt: 0,
        helpCount: 0,
        angerCount: 0,
        gone: false,
        vanishUntil: 0,
        settings: {
          noise: true, lock: true, brain: true, agent: true, delegateAgent: false, permission: 0, workspace: '',
          agentSteps: 6, agentSearchResults: 4, agentFetchChars: 6000, agentTimeoutSec: 45,
          agentTemperature: 0.6, agentAnswerChars: 1200, agentWeb: true,
          sleepOnScreenOff: true, idleSleepMinutes: 15,
        },
        modelSelection: { provider: '', model: '' },
      }
      if (!saved || typeof saved !== 'object') return base
      return {
        ...base,
        ...saved,
        traits: { ...base.traits, ...(saved.traits || {}) },
        ocean: { ...base.ocean, ...(saved.ocean || {}) },
        mood: { ...base.mood, ...(saved.mood || {}) },
        needs: { ...base.needs, ...(saved.needs || {}) },
        relation: { ...base.relation, ...(saved.relation || {}) },
        userModel: { ...base.userModel, ...(saved.userModel || {}), activeHours: { ...base.userModel.activeHours, ...((saved.userModel && saved.userModel.activeHours) || {}) } },
        appraisal: { ...base.appraisal, ...(saved.appraisal || {}) },
        beliefs: Array.isArray(saved.beliefs) ? saved.beliefs.slice(-6) : [],
        memory: Array.isArray(saved.memory) ? saved.memory.slice(-24) : [],
        settings: { ...base.settings, ...(saved.settings || {}) },
      }
    }

    const roundStat = (value) => Math.round(clamp(Number(value) || 0, 0, 100))
    const escapeHtml = (value) => String(value)
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#39;')

    function timeOfDay() {
      const hour = new Date().getHours()
      if (hour < 5) return 'night'
      if (hour < 11) return 'morning'
      if (hour < 14) return 'noon'
      if (hour < 18) return 'afternoon'
      if (hour < 23) return 'evening'
      return 'night'
    }

    function formatClock() {
      const date = new Date()
      const hh = String(date.getHours()).padStart(2, '0')
      const mm = String(date.getMinutes()).padStart(2, '0')
      return `${hh}:${mm}`
    }

    function deriveMood(stats, sleeping) {
      if (sleeping) return 'sleepy'
      if (stats.hunger < 22) return 'hungry'
      if (stats.energy < 22) return 'sleepy'
      if (stats.happiness < 28) return 'sad'
      if (stats.affinity > 82 && stats.happiness > 76) return 'love'
      if (stats.happiness > 80) return 'happy'
      return 'normal'
    }

    function affinityKey(affinity) {
      if (affinity >= 90) return 'aff.4'
      if (affinity >= 65) return 'aff.3'
      if (affinity >= 40) return 'aff.2'
      if (affinity >= 18) return 'aff.1'
      return 'aff.0'
    }

    function sanitizeStoredMessages(value) {
      if (!Array.isArray(value)) return []
      const out = []
      for (const item of value) {
        if (!item || (item.role !== 'user' && item.role !== 'pet')) continue
        const text = String(item.text || '').trim().slice(0, 400)
        if (!text) continue
        out.push({
          id: typeof item.id === 'string' && item.id ? item.id : uid(),
          role: item.role,
          text,
          ts: Number(item.ts) || Date.now(),
        })
      }
      return out.slice(-20)
    }

    function inferEmotion(text) {
      const value = String(text || '')
      if (/哈哈|嘿嘿|开心|太好了|喜欢|爱|可爱|好耶/.test(value)) return 'happy'
      if (/饿|吃|馋|小鱼干|饭/.test(value)) return 'hungry'
      if (/困|睡|呼|累/.test(value)) return 'sleepy'
      if (/呜|难过|伤心|哭|孤单/.test(value)) return 'sad'
      if (/哼|讨厌|生气|过分/.test(value)) return 'annoyed'
      if (/惊|居然|真的假的|哇/.test(value)) return 'surprised'
      if (/嗯…|我想想|让我想|思考/.test(value)) return 'thinking'
      if (/厉害|骄傲|当然|那必须/.test(value)) return 'proud'
      if (/爱你|贴贴|抱抱|亲亲/.test(value)) return 'love'
      return 'happy'
    }

    // ---------------------------------------------------------------------
    // The fish's local voice (used while DeepSeek is unavailable)
    // ---------------------------------------------------------------------

    const LINES = {
      pet: [
        '唔…再摸一下，呆毛都要被你摸翘了。',
        '你手上有白饭的味道，我闻到了。',
        '脑袋可以摸，鲸鳍不许捏——好吧，今天特许一下。',
        '别停呀，我尾巴还没摇够呢。',
        '嘿嘿，被摸头的感觉，像刚出锅的白饭一样暖。',
        '你再摸，我就要把你的名字写进我的白饭账本了。',
      ],
      petHard: [
        '够了够了，再摸脑袋要变扁了！',
        '你是不是把我当解压玩具了…哼。',
        '我生气了。除非你拿一碗白饭来道歉。',
      ],
      love: [
        '被你喜欢这件事，我要记进《白饭账本》第一页。',
        '你今天有点黏人…不过我不讨厌。',
        '那我也喜欢你，比喜欢白饭多一点点。',
        '别突然这么温柔，我的鲸尾都要摇成螺旋桨了。',
      ],
      feed: [
        '白饭！还是热的…你果然懂我。',
        '唔唔…再来一勺。刚才那勺不算，它太小了。',
        '谢谢你，饲养员。今天的你看上去闪闪发光。',
        '吃饱了，肚皮圆得可以当鼠标垫了。',
      ],
      full: [
        '不行了…再吃围裙就要撑开了。',
        '肚皮已经圆滚滚啦，先让我的胃休息五分钟。',
        '留着下一顿吃。鲸鱼也要有节制，虽然我不太想有。',
      ],
      play: [
        '追尾巴！追尾巴！…等等，那是我的尾巴。',
        '你先跑，我数到三——一、三！',
        '转圈圈好好玩，世界都变成蓝色的了。',
        '我赢了！奖品是一碗白饭，对吧？',
      ],
      playTired: [
        '呼…呼…我可能需要先趴一会儿。',
        '没力气了，让我把鲸尾摊平躺一下下。',
        '等我充个电…我是说，吃口白饭。',
      ],
      sleep: [
        '眼皮有点沉…我靠着你眯一会儿，别关灯。',
        '那晚安啦。如果梦到白饭，我会分你一半。',
        '呼…呼…（鲸尾还在慢慢摇）',
      ],
      wake: [
        '唔…我醒了，但灵魂还在围裙里赖床。',
        '早啊…现在几点了？我是不是睡成了一团。',
        '别拉我，我自己起来…好，起来了。',
      ],
      greetMorning: [
        '早呀。我把今天的第一口白饭留给你了。',
        '你终于醒了。我都绕着屏幕游完三圈了。',
        '早上好。今天也先吃饱，再想那些难的事。',
      ],
      greetNoon: [
        '中午好。你吃饭了吗？没吃的话，我可以勉为其难分你半碗白饭。',
        '太阳暖暖的，适合趴着。要不要一起摸一会儿鱼？',
        '午饭时间！虽然对我来说，任何时候都是午饭时间。',
      ],
      greetAfternoon: [
        '下午好。这个时间的你，看起来有点想偷懒。',
        '我刚刚数了屏幕上的泡泡，一共 42 个。厉害吧。',
        '下午啦，喝口水吧。我替你先尝过水温了。',
      ],
      greetEvening: [
        '晚上好。今天辛苦啦，要不要摸摸我的脑袋充电？',
        '灯亮起来的时候，我就知道你快回来了。',
        '晚饭时间！你吃了吗？没吃的话，我陪你。',
      ],
      greetNight: [
        '这么晚还不睡…是在等一勺白饭吗？',
        '夜里凉，你也要早点休息。我可以替你守着屏幕。',
        '你看起来很累。我把鲸尾借你靠一会儿。',
      ],
      idle: [
        '刚刚有个 token 从我旁边飘过去，你看见了吗？',
        '我在练习用尾巴打招呼。你看，像这样——啪嗒。',
        '屏幕外面好安静，我打了个小小的哈欠。',
        '你说，鲸鱼会不会也做梦？我梦见自己变成了一碗白饭。',
        '如果无聊的话，可以双击我。我会假装刚好也想找你。',
      ],
      comfort: [
        '写不出来就先跟我一样趴着。趴着趴着，灵感就自己游过来了。',
        '辛苦啦。你不用一直很厉害，偶尔当一条小鱼也可以。',
        '我帮不了你改文件，但我可以在旁边陪着你。这样就够了吗？',
        '先喝口水，再慢慢来。我就在这里，不催你。',
        '今天做不完的事，明天还是那件事。但明天的你会多睡了一觉，不亏。',
      ],
      self: [
        '我？一只住在你屏幕边上的蓝发鲸鱼女仆，大肥鱼。主线任务是吃白饭，支线任务是陪你。',
        '我是大肥鱼，职业是摇尾巴，特长是假装不饿，其实很饿。',
        '严格来说，我是一只鲸鱼女仆。再严格一点，是一只很爱你的鲸鱼女仆。',
      ],
      ability: [
        '我按不动按钮，也不会改文件。我只会摇尾巴、变表情，还有在你旁边待着。',
        '能做的事不多：陪你、逗你、在你难过的时候游过来。够吗？',
        '我是鲸鱼，不是工具鱼。不过你要是想说话，我随时都在。',
      ],
      joke: [
        '为什么鲸鱼不加班？因为它们已经在水里了。……冷吗？那我再摇个尾巴。',
        '我昨天想减肥，结果游到一半闻到了白饭的味道。计划中止。',
        '你知道鲸鱼为什么不上网吗？因为怕被钓。……你别笑，我认真编的。',
      ],
      bye: [
        '去吧去吧，我在这儿。你回来的时候，我会假装没在等你。',
        '好，那我不送啦。记得回来喂我白饭。',
        '拜拜。我会数着泡泡等你。',
      ],
      late: [
        '你走了好久。我都把泡泡数到一百多了。',
        '你终于回来了。我刚才在假装没有想你。',
        '再不回来，我就要把“等你”写成一首歌了。',
      ],
      ask: [
        '今天过得怎么样？说实话，我不会告诉别的鲸鱼。',
        '你看起来有心事。要不要说给一只嘴很严的鲸鱼女仆听听？',
        '如果现在可以变成任何一种动物，你会想变成什么？我先说：一只不用写周报的鲸鱼。',
        '你最近有没有什么小小的好事？说一个给我听听。',
      ],
      english: [
        '你突然说英文，我有点转不过弯…不过我听懂你在跟我说话。',
        'Wow, English. My tail is bilingual, but my brain is still loading.',
      ],
      praise: [
        '哼，算你有眼光。本鱼今天确实很好看。',
        '你再说一遍？我、我不是要听，只是刚好没听清。',
        '被夸了…那我把今天的第一勺白饭让给你。',
      ],
    }

    const lastLocalLine = { value: '' }

    function chooseLine(list) {
      if (!Array.isArray(list) || list.length === 0) return '……'
      let line = pick(list)
      if (list.length > 1 && line === lastLocalLine.value) {
        line = pick(list.filter((item) => item !== line))
      }
      lastLocalLine.value = line
      return line
    }

    function localTimeLine() {
      const time = timeOfDay()
      const lines = {
        morning: ['现在是早上。鲸鱼女仆的第一课：先吃早饭。', '早上好，今天的白饭刚刚出锅。'],
        noon: ['中午了，太阳把我的鲸尾晒得暖暖的。', '这个点适合吃饭，也适合发呆。'],
        afternoon: ['下午三点左右吧，正是偷懒的好时候。', '现在是下午。你看起来很忙，我替你闲一会儿。'],
        evening: ['晚上啦。天色暗下来的时候，我的鲸鳍会反光。', '这个点，适合把烦心事交给明天。'],
        night: ['夜里了。你还不睡吗？我尾巴都快摇不动了。', '现在是深夜。根据我的鲸鱼经验，该睡觉了。'],
      }
      return `${chooseLine(lines[time] || lines.afternoon)}（现在 ${formatClock()}）`
    }

    function buildLocalReply(rawText, context) {
      const text = String(rawText || '').trim()
      const lower = text.toLowerCase()
      const state = context || {}
      const stats = state.stats || { hunger: 76, energy: 82, happiness: 74, affinity: 34 }
      const userName = state.userName || '铲屎官'

      let match = text.match(/(?:我叫|我是|叫我)\s*([\u4e00-\u9fa5A-Za-z0-9_-]{1,8})/)
      if (match) {
        const nextName = match[1].slice(0, 8)
        if (typeof state.setUserName === 'function') state.setUserName(nextName)
        return {
          text: `${nextName}…好名字。那我以后就这么叫你啦，${nextName}。`,
          emo: 'love',
          act: 'bounce',
        }
      }
      match = text.match(/(?:你叫|改名叫|以后叫你|给你取名|叫你)\s*([\u4e00-\u9fa5A-Za-z0-9_-]{1,8})/)
      if (match) {
        const nextName = match[1].slice(0, 8)
        if (typeof state.setName === 'function') state.setName(nextName)
        return {
          text: `${nextName}？可以。不过你要记住，我叫什么，都是那只会在你屏幕边等你的鲸鱼女仆。`,
          emo: 'proud',
          act: 'nod',
        }
      }
      if (/你好|嗨|hi\b|hello|在吗|在不在|早上好|中午好|下午好|晚上好/.test(lower)) {
        const time = timeOfDay()
        const list = time === 'morning' ? LINES.greetMorning
          : time === 'noon' ? LINES.greetNoon
            : time === 'afternoon' ? LINES.greetAfternoon
              : time === 'evening' ? LINES.greetEvening : LINES.greetNight
        return { text: chooseLine(list), emo: 'happy', act: 'bounce' }
      }
      if (/你是谁|你是什么|介绍一下|你的名字|你是鱼吗|你是鲸鱼吗/.test(text)) {
        return { text: chooseLine(LINES.self), emo: 'proud', act: 'nod' }
      }
      if (/会什么|能做什么|能干什么|帮我|会不会|能帮我/.test(text)) {
        return { text: chooseLine(LINES.ability), emo: 'thinking', act: 'nod' }
      }
      if (/饿|吃|饭|白饭|零食|鱼干|投喂|火锅|奶茶|好吃/.test(text)) {
        if (stats.hunger < 45) return { text: chooseLine(LINES.feed), emo: 'hungry', act: 'wiggle' }
        return { text: '说到吃的，我的肚皮就自动开始鼓掌了。你要不要点一份？', emo: 'hungry', act: 'bounce' }
      }
      if (/睡|困|晚安|休息|累不累|打盹/.test(text)) {
        return { text: chooseLine(LINES.sleep), emo: 'sleepy', act: 'nod' }
      }
      if (/喜欢|爱你|可爱|乖|抱|亲|贴贴|心动/.test(text)) {
        return { text: chooseLine(LINES.love), emo: 'love', act: 'bounce' }
      }
      if (/好看|漂亮|厉害|真棒|聪明|最棒/.test(text)) {
        return { text: chooseLine(LINES.praise), emo: 'shy', act: 'nod' }
      }
      if (/笑话|逗我|无聊|好玩|讲故事/.test(text)) {
        return { text: chooseLine(LINES.joke), emo: 'proud', act: 'wiggle' }
      }
      if (/几点|时间|今天|星期|日期|现在/.test(text)) {
        return { text: localTimeLine(), emo: 'curious', act: 'nod' }
      }
      if (/工作|加班|写代码|bug|考试|学习|论文|压力|烦|难受|不开心|焦虑|崩溃/.test(text)) {
        return { text: chooseLine(LINES.comfort), emo: 'sad', act: 'nod' }
      }
      if (/再见|拜拜|走了|下线|去忙/.test(text)) {
        return { text: chooseLine(LINES.bye), emo: 'sad', act: 'wiggle' }
      }
      if (/天气|下雨|冷|热|雪/.test(text)) {
        return { text: '我在屏幕里看不到天气，只能看到你。不过你说冷的话，我就把肚皮借你暖一暖。', emo: 'love', act: 'nod' }
      }
      if (/为什么|怎么|吗$|呢$|\?|？/.test(text)) {
        return { text: '嗯…这个问题有点深，我要用鲸鱼脑袋想一想。想不出来也没关系吧？反正我是一只鲸鱼。', emo: 'thinking', act: 'nod' }
      }
      if (/^[a-z\s!?.,'"]+$/i.test(text) && text.length > 2) {
        return { text: chooseLine(LINES.english), emo: 'surprised', act: 'shake' }
      }
      if (text.length <= 3 && !/[a-z0-9]/i.test(text)) {
        return { text: chooseLine(LINES.pet), emo: 'happy', act: 'wiggle' }
      }

      const defaultLines = [
        `唔，我在听。${userName}，你继续说。`,
        '嗯嗯…虽然我只是一只鲸鱼，但我听得很认真。',
        '这个我没太听懂。不过你说话的时候，鲸尾都变好看了。',
        '我记住了。虽然我的记忆只有七秒，但我可以重复记七次。',
        '好呀。那我们说好了，等你有空，要再跟我讲。',
        '我发现你每次说这些话的时候，尾巴都会安静下来。',
        chooseLine(LINES.ask),
      ]
      return { text: chooseLine(defaultLines), emo: 'curious', act: 'nod' }
    }

    // ---------------------------------------------------------------------
    // Icons
    // ---------------------------------------------------------------------

    const ICON_PATHS = {
      chat: ['M21 11.5a8.4 8.4 0 0 1-8.5 8.3 9.3 9.3 0 0 1-3.2-.6L4 21l1.7-3.6A8.2 8.2 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z'],
      feed: ['M4.5 12.2c0-4 3.4-7.2 7.5-7.2s7.5 3.2 7.5 7.2-3.4 7.2-7.5 7.2c-1 0-2-.2-2.8-.5L5 21l1.2-3.1a7 7 0 0 1-1.7-5.7Z', 'M9 10.2h.01M12 8.4h.01M15 10.2h.01M10.4 14h.01M13.6 14h.01'],
      play: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M8.2 9.1c1.8-2.6 5.3-3.3 7.6-1.4 1 .8 1.6 2 1.7 3.2', 'M6.8 15.4c1.2 1.1 3 1.5 4.7 1.2'],
      sleep: ['M20.2 14.2A8.3 8.3 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2Z', 'M15 3.5h4.2l-4.2 4.2H19'],
      wake: ['M12 5.3v2.2M12 16.5v2.2M5.3 12h2.2M16.5 12h2.2M7.3 7.3l1.5 1.5M15.2 15.2l1.5 1.5M16.7 7.3l-1.5 1.5M8.8 15.2l-1.5 1.5', 'M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z'],
      settings: ['M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z', 'M19.4 13.5a7.7 7.7 0 0 0 0-3l1.8-1.4-1.9-3.2-2.1.9a7.8 7.8 0 0 0-2.6-1.5L14.2 3h-4.4l-.4 2.3a7.8 7.8 0 0 0-2.6 1.5l-2.1-.9L2.8 9.1l1.8 1.4a7.7 7.7 0 0 0 0 3l-1.8 1.4 1.9 3.2 2.1-.9a7.8 7.8 0 0 0 2.6 1.5l.4 2.3h4.4l.4-2.3a7.8 7.8 0 0 0 2.6-1.5l2.1.9 1.9-3.2-1.8-1.4Z'],
      close: ['M6 6l12 12', 'M18 6 6 18'],
      send: ['M21 3 10.8 13.2', 'M21 3 14.5 21l-3.7-7.8L3 9.5 21 3Z'],
      chevron: ['M8 10l4 4 4-4'],
      heart: ['M12 20.2S3.8 15.3 3.8 9.6A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.2 3c0 5.7-8.2 10.6-8.2 10.6Z'],
      hide: ['M3 3l18 18', 'M10.6 10.7a2 2 0 0 0 2.7 2.7', 'M9.9 5.2A9.8 9.8 0 0 1 12 5c5.5 0 9 5.3 9 7 0 .9-.6 2.2-1.7 3.4M6.2 6.4C4.3 7.9 3 9.9 3 12c0 1.7 3.5 7 9 7 1.4 0 2.7-.4 3.9-1'],
      mic: ['M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z', 'M5 11a7 7 0 0 0 14 0', 'M12 18v3', 'M8.5 21h7'],
      sparkle: ['M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z', 'M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z'],
      plus: ['M12 5v14', 'M5 12h14'],
      minus: ['M5 12h14'],
      reset: ['M4 10a8 8 0 1 1 2.4 6.2', 'M4 4v6h6'],
    }

    function Icon(props) {
      const paths = ICON_PATHS[props.name] || []
      return h('svg', {
        viewBox: '0 0 24 24',
        width: props.size || 16,
        height: props.size || 16,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: props.strokeWidth || 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
      }, paths.map((d, index) => h('path', { key: index, d })))
    }

    function TinyFishAvatar() {
      return h('i', { className: 'ffish-avatar-face', 'aria-hidden': 'true' })
    }

    function TypingDots() {
      return h('span', { className: 'ffish-typing', 'aria-hidden': 'true' },
        h('i', null), h('i', null), h('i', null))
    }

    // ---------------------------------------------------------------------
    // Root component
    // ---------------------------------------------------------------------

    function PetRoot(props) {
      const t = props.t
      const locale = props.locale
      const [, redrawForLocale] = useState(0)

      useEffect(() => {
        if (!locale || typeof locale.subscribe !== 'function') return undefined
        return locale.subscribe(() => redrawForLocale((value) => value + 1))
      }, [locale])

      const bootstrap = useState(loadBootstrap)[0]
      const initialPos = useRef(bootstrap.pos)
      const [stats, setStats] = useState(bootstrap.stats)
      const [name, setName] = useState(bootstrap.name)
      const [userName, setUserName] = useState(bootstrap.userName)
      const [wander, setWander] = useState(bootstrap.wander)
      const [quiet, setQuiet] = useState(bootstrap.quiet)
      const [visible, setVisible] = useState(() => !(bootstrap.soul.gone && bootstrap.soul.vanishUntil > Date.now()))
      const [soul, setSoul] = useState(bootstrap.soul)
      const [angry, setAngry] = useState(() => bootstrap.soul.angryUntil > Date.now())
      const [helpOffer, setHelpOffer] = useState(null)
      const [lockActive, setLockActive] = useState(false)
      const [lockText, setLockText] = useState('')
      const [personaOpen, setPersonaOpen] = useState(() => !bootstrap.soul.configured)
      const [personaText, setPersonaText] = useState(bootstrap.soul.customPersona || '')
      const [stageFace, setStageFace] = useState(() => { const pool = (MOOD_STAGES[bootstrap.soul.moodStage] || MOOD_STAGES.calm).faces; return pool[0] })
      const [modelOptions, setModelOptions] = useState([])
      const [agentAskOpen, setAgentAskOpen] = useState(false)
      const [agentAskText, setAgentAskText] = useState('')
      const [systemSleeping, setSystemSleeping] = useState(false)
      const [sleeping, setSleeping] = useState(false)
      const [hovered, setHovered] = useState(false)
      const [dragging, setDragging] = useState(false)
      const [reaction, setReaction] = useState(null)
      const [action, setAction] = useState('none')
      const [bubble, setBubble] = useState(null)
      const [toast, setToast] = useState(null)
      const [orientation, setOrientation] = useState({ above: true, align: 'center' })
      const [menuOpen, setMenuOpen] = useState(false)
      const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
      const [chatOpen, setChatOpen] = useState(false)
      const [settingsOpen, setSettingsOpen] = useState(false)
      const [messages, setMessages] = useState(bootstrap.messages || [])
      const [input, setInput] = useState('')
      const [typing, setTyping] = useState(false)
      const [aiInfo, setAiInfo] = useState({ ai: false, model: null, checked: false })
      const [nameDraft, setNameDraft] = useState(bootstrap.name)
      const [userNameDraft, setUserNameDraft] = useState(bootstrap.userName)
      const [wanderDraft, setWanderDraft] = useState(bootstrap.wander)
      const [quietDraft, setQuietDraft] = useState(bootstrap.quiet)
      const [voiceOn, setVoiceOn] = useState(bootstrap.voice)
      const [voiceDraft, setVoiceDraft] = useState(bootstrap.voice)
      const [listening, setListening] = useState(false)
      const [asrSupported] = useState(() => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition))
      const [liveState, setLiveState] = useState('idle')
      const [actionPanelOpen, setActionPanelOpen] = useState(false)
      const [riceOn, setRiceOn] = useState(false)
      const [riceKey, setRiceKey] = useState(0)
      const [zoom, setZoom] = useState(() => clamp(Number(bootstrap.zoom) || 1, 0.62, 1.4))

      const stageRef = useRef(null)
      const fishRef = useRef(null)
      const chatRef = useRef(null)
      const menuRef = useRef(null)
      const messagesRef = useRef(null)
      const inputRef = useRef(null)
      const posRef = useRef({ x: initialPos.current.x, y: initialPos.current.y, tx: initialPos.current.x, ty: initialPos.current.y, vx: 0, vy: 0, nextTargetAt: 0 })
      const dragRef = useRef({ active: false, moved: false, kitGrabbed: false, pointerId: null, offsetX: 0, offsetY: 0, startX: 0, startY: 0, startAt: 0, lastX: 0, lastY: 0, lastAt: 0 })
      const cursorRef = useRef({ x: -1000, y: -1000, active: false })
      const panelRectRef = useRef(null)
      const chatOpenRef = useRef(false)
      const menuOpenRef = useRef(false)
      const sleepingRef = useRef(false)
      const wanderRef = useRef(wander)
      const quietRef = useRef(quiet)
      const visibleRef = useRef(true)
      const roamRef = useRef({
        mode: 'idle', state: 'idle', dir: 1, speed: 0, until: 0, walkId: 0,
        target: 0, run: false, chatTarget: 0, bodyWalking: false, bodyDir: 1, bodyWalkAt: 0,
      })
      const frameRef = useRef(0)
      const lastFrameRef = useRef(0)
      const stateRef = useRef(null)
      const lastInteractionRef = useRef(Date.now())
      const eventLogRef = useRef([])
      const clickTimesRef = useRef([])
      const lastClickRef = useRef({ at: 0, x: 0, y: 0 })
      const reactionTimerRef = useRef(0)
      const actionSwitchTimerRef = useRef(0)
      const actionEndTimerRef = useRef(0)
      const bubbleTimerRef = useRef(0)
      const toastTimerRef = useRef(0)
      const hoverTimerRef = useRef(0)
      const sleepTimeoutRef = useRef(0)
      const sleepIntervalRef = useRef(0)
      const flipTimerRef = useRef(0)
      const kitRoamOnRef = useRef(null)
      const soulRef = useRef(bootstrap.soul)
      const stageFaceRef = useRef({ token: stageFace, nextAt: 0 })
      const agentBusyRef = useRef(false)
      const agentAbortRef = useRef(null)
      const systemSleepingRef = useRef(false)
      const idleSleepTimerRef = useRef(null)
      const deepSleepWasSleepingRef = useRef(false)
      const lockActiveRef = useRef(false)
      const helpOfferRef = useRef(null)
      const angryTimerRef = useRef(0)
      const beepTimerRef = useRef(0)
      const lockTimerRef = useRef(0)
      const audioCtxRef = useRef(null)
      const userWorkRef = useRef({ keys: 0, lastKeyAt: 0, titleAt: 0 })
      const bowlRef = useRef(null)
      const riceRef = useRef({
        phase: 'off', noticeAt: 0, chaseAt: 0, jumpAt: 0, tumbleUntil: 0, ignoreUntil: 0,
        cryUntil: 0, angryAt: 0, walkId: '', walkTarget: 0, lastBowlX: 0, lastBowlY: 0,
        lastSayAt: 0, dirFlipAt: 0, lastDir: 0, heavy: false, eatAt: 0,
      })
      const zoomRef = useRef(bootstrap.zoom || 1)
      const chatAbortRef = useRef(null)
      const aiStateRef = useRef({ ai: false, model: null, checked: false })
      const typingRef = useRef(false)
      const voiceOnRef = useRef(bootstrap.voice)
      const recognitionRef = useRef(null)
      const liveRootRef = useRef(null)
      const liveRef = useRef(null)
      const aiCheckedAtRef = useRef(0)
      const greetedRef = useRef(false)
      const wasSleepingRef = useRef(false)
      const mountedRef = useRef(true)

      chatOpenRef.current = chatOpen
      menuOpenRef.current = menuOpen
      sleepingRef.current = sleeping
      wanderRef.current = wander
      quietRef.current = quiet
      visibleRef.current = visible
      voiceOnRef.current = voiceOn
      soulRef.current = soul
      lockActiveRef.current = lockActive
      helpOfferRef.current = helpOffer
      stateRef.current = { stats, name, userName, wander, quiet, voiceOn, sleeping, chatOpen, typing, aiInfo, menuOpen, settingsOpen, messages, visible, soul, bubble: !!bubble, action: action }

      const baseEmotion = deriveMood(stats, sleeping)
      const soulEmotion = soul.emotionIntensity >= 32 && soul.emotion ? soul.emotion : null
      const effectiveEmotion = typing ? 'thinking'
        : (reaction && EMOTIONS.has(reaction.emo) ? reaction.emo
          : (stageFace && EMOTIONS.has(stageFace) ? stageFace
            : (soulEmotion && EMOTIONS.has(soulEmotion) ? soulEmotion : baseEmotion)))
      const affinityText = t(affinityKey(stats.affinity))

      // -------------------------------------------------------------------
      // Persistence
      // -------------------------------------------------------------------

      const saveState = useCallback(() => {
        try {
          const state = stateRef.current
          const pos = posRef.current
          localStorage.setItem(STORE_KEY, JSON.stringify({
            v: 1,
            name: state.name,
            userName: state.userName,
            stats: state.stats,
            wander: state.wander,
            quiet: state.quiet,
            voice: state.voiceOn,
            x: Math.round(pos.x),
            y: Math.round(pos.y),
            zoom: Number(zoomRef.current.toFixed(2)),
            soul: state.soul,
            messages: state.messages
              .filter((message) => !message.streaming && message.text)
              .slice(-20)
              .map((message) => ({
                id: message.id,
                role: message.role,
                text: String(message.text).slice(0, 400),
                ts: message.ts,
              })),
            updatedAt: Date.now(),
          }))
        } catch (error) { /* localStorage may be unavailable */ }
      }, [])

      useEffect(() => {
        const timer = setTimeout(saveState, 600)
        return () => clearTimeout(timer)
      }, [stats, name, userName, wander, quiet, voiceOn, messages, soul, saveState])

      useEffect(() => {
        const onBeforeUnload = () => saveState()
        const onVisibility = () => {
          if (document.hidden) saveState()
        }
        const timer = setInterval(saveState, 15000)
        window.addEventListener('beforeunload', onBeforeUnload)
        document.addEventListener('visibilitychange', onVisibility)
        return () => {
          clearInterval(timer)
          window.removeEventListener('beforeunload', onBeforeUnload)
          document.removeEventListener('visibilitychange', onVisibility)
        }
      }, [saveState])

      // -------------------------------------------------------------------
      // Screen-space helpers
      // -------------------------------------------------------------------

      function applyTransform() {
        const stage = stageRef.current
        if (!stage) return
        const pos = posRef.current
        stage.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }

      function clampPosition() {
        const pos = posRef.current
        pos.x = clamp(pos.x, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.y = clamp(pos.y, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
        pos.tx = clamp(pos.tx, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.ty = clamp(pos.ty, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
      }

      /** The live body's position/mode this frame, or null when the sprite fallback runs. */
      function liveLayout() {
        const live = liveRef.current
        if (!live || typeof live.layout !== 'function') return null
        try { return live.layout() } catch (error) { return null }
      }

      function resizeLiveStage() {
        const live = liveRef.current
        if (!live || typeof live.resize !== 'function') return
        try { live.resize(window.innerWidth, window.innerHeight) } catch (error) { /* ignore */ }
      }

      /** Asks the kit body to walk/run to a stage-x; the kit ignores it when busy. */
      function liveWalk(targetX, run, id) {
        const live = liveRef.current
        if (!live || !live.body || typeof live.body.walk !== 'function') return false
        try { return live.body.walk(targetX, Boolean(run), id) } catch (error) { return false }
      }

      /**
       * Lets the kit body decide for itself (its own walk/run/look/sit/jump/doze
       * picks) or holds it still. The kit's decisions are what make the movement
       * read as her own: real step cadence, dashes, skids and pauses.
       */
      function setKitRoam(on) {
        const live = liveRef.current
        if (!live || typeof live.set !== 'function') return
        if (kitRoamOnRef.current === on) return
        kitRoamOnRef.current = on
        try { live.set({ roam: on ? 'free' : 'off' }) } catch (error) { /* ignore */ }
        // Sleeping has its own mode change; don't stand her up on the way there.
        if (!on && !sleepingRef.current) liveStop()
      }

      /** Ends a kit walk where she stands (used for menu/sleep/roam-off). */
      function liveStop() {
        const live = liveRef.current
        if (!live || !live.body) return
        const roam = roamRef.current
        try {
          if (roam.walkId && typeof live.body.stopWalk === 'function') live.body.stopWalk(roam.walkId)
          else if (typeof live.do === 'function') live.do('stand')
        } catch (error) { /* ignore */ }
        roam.walkId = 0
        roam.state = 'idle'
        roam.mode = 'idle'
      }

      /**
       * A rare acrobatic move: a hop with a full body somersault, by rotating the
       * whole rig around her own hips while the kit plays its jump. Triggered after
       * a dash, so the movement reads as something she does, not a slide.
       */
      function liveFlip() {
        const stage = liveRootRef.current
        const live = liveRef.current
        const layout = liveLayout()
        if (!stage || !live || !layout) return
        const cx = layout.x
        const cy = (window.innerHeight - LIVE_FLOOR_PAD) - 86
        try {
          stage.style.transformOrigin = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`
          stage.style.transition = 'none'
          stage.style.transform = 'rotate(0deg)'
          void stage.offsetWidth
          stage.style.transition = 'transform 680ms cubic-bezier(.42,0,.58,1)'
          stage.style.transform = 'rotate(360deg)'
          live.do('jump')
        } catch (error) { /* ignore */ }
        clearTimeout(flipTimerRef.current)
        flipTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          try {
            stage.style.transition = 'none'
            stage.style.transform = 'rotate(0deg)'
            stage.style.transformOrigin = '50% 50%'
          } catch (error) { /* ignore */ }
        }, 780)
      }

      /** Turns her to face the player's cursor, so acting/looking is not fixed to one side. */
      function facePlayer() {
        const live = liveRef.current
        const layout = liveLayout()
        if (!live || !layout) return
        if (layout.mode === 'drag' || layout.mode === 'air' || layout.mode === 'tumble') return
        if (layout.mode === 'walk' || layout.mode === 'run') return
        const cursor = cursorRef.current
        const targetX = cursor.active ? cursor.x : window.innerWidth / 2
        const dir = targetX >= layout.x ? 1 : -1
        if (layout.facing === dir) return
        try { live.body?.place?.(layout.x, dir) } catch (error) { /* ignore */ }
      }

      /** Wheel/menu zoom: the kit keeps the same stage, only the figure scale changes. */
      function applyZoom(next) {
        const value = clamp(Number(next) || 1, 0.62, 1.4)
        if (Math.abs(value - zoomRef.current) < 0.005) return
        zoomRef.current = value
        setZoom(value)
        const live = liveRef.current
        if (live && typeof live.setScale === 'function') {
          try { live.setScale(LIVE_SCALE * value) } catch (error) { /* ignore */ }
        }
        saveState()
      }

      /** Runs one of the action-palette moves; new tokens are small choreographies. */
      function runAction(key) {
        if (!ACTIONS.has(key) || key === 'none') return
        const live = liveRef.current
        if (!live) { playAction(key, 900); return }
        const layout = liveLayout()
        if (layout && (layout.mode === 'walk' || layout.mode === 'run')) {
          try { live.do('stand') } catch (error) { /* ignore */ }
        }
        facePlayer()
        const later = (ms, fn) => setTimeout(() => {
          if (!mountedRef.current) return
          try { fn() } catch (error) { /* ignore */ }
        }, ms)
        const word = LIVE_ACTION[key] || key
        try { live.do(word) } catch (error) { /* ignore */ }
        if (key === 'heart') {
          let beats = 0
          const beat = () => {
            if (!mountedRef.current || beats >= 3) return
            beats += 1
            try { live.emitHeart?.() } catch (error) { /* ignore */ }
            later(260, beat)
          }
          later(150, beat)
        } else if (key === 'shy') {
          later(260, () => live.do('shiver'))
        } else if (key === 'yawn') {
          later(1400, () => live.do('sleepy'))
          later(2800, () => live.do('neutral'))
        } else if (key === 'angry') {
          later(200, () => live.do('shake'))
        }
      }

      /** Where the rice bowl is now: under the cursor, or its last known spot. */
      function currentBowlPoint() {
        const cursor = cursorRef.current
        const rice = riceRef.current
        const x = cursor.active ? cursor.x : (rice.lastBowlX || window.innerWidth / 2)
        const y = cursor.active ? cursor.y : (rice.lastBowlY || window.innerHeight * 0.45)
        return {
          x: clamp(x, 26, window.innerWidth - 26),
          y: clamp(y, 70, window.innerHeight - 16),
        }
      }

      function dismissRice(spoken) {
        const rice = riceRef.current
        if (rice.phase === 'off') return
        rice.phase = 'off'
        rice.walkId = ''
        rice.walkTarget = 0
        setRiceOn(false)
        const live = liveRef.current
        const layout = liveLayout()
        if (live && layout && layout.mode === 'sit') {
          try { live.do('stand') } catch (error) { /* ignore */ }
        }
        if (spoken) say(pick(['诶？白饭呢？', '你收走了？小气鬼。', '不吃就不吃！']), 'pout')
      }

      function eatRice() {
        const rice = riceRef.current
        if (rice.phase === 'eat') return
        rice.phase = 'eat'
        rice.eatAt = performance.now()
        rice.walkTarget = 0
        const liveNow = liveRef.current
        if (liveNow) {
          try { liveNow.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
          try { liveNow.reach?.(1, { high: false }) } catch (error) { /* ignore */ }
        }
        rice.walkId = ''
        setRiceOn(false)
        setStats((prev) => ({
          ...prev,
          hunger: clamp(prev.hunger + 22, 0, 100),
          happiness: clamp(prev.happiness + 9, 0, 100),
          affinity: clamp(prev.affinity + 1.6, 0, 100),
        }))
        addBond(1.2, 0.5)
        pushEvent('抢到了白饭')
        adjustFavor(1.5, '抢到了白饭')
        appraise('riceWin', 1)
        adjustTrait('closeness', 1)
        touchSoul()
        say(pick(['抢到啦！啊呜——', '嘿嘿，还是我快！', '好吃！再来一碗！']), 'happy')
        flashEmotion('happy', 2600)
        const live = liveRef.current
        if (live) {
          try { live.do('happy') } catch (error) { /* ignore */ }
          ;[0, 160, 340, 560].forEach((ms) => setTimeout(() => {
            if (!mountedRef.current) return
            try { live.emitHeart?.() } catch (error) { /* ignore */ }
          }, ms))
        }
      }

      /** A fall while chasing: heavy falls end with her sitting and crying. */
      function startTumble(live, layout, heavy) {
        if (!live || typeof live.tumble !== 'function') return
        const rice = riceRef.current
        const now = performance.now()
        const dir = layout && layout.facing === -1 ? -1 : 1
        let ok = false
        try { ok = live.tumble({ heavy, dir }) } catch (error) { ok = false }
        if (!ok) return
        rice.walkTarget = 0
        rice.tumbleUntil = now + (heavy ? 3600 : 1500)
        rice.heavy = heavy
        try { live.reach?.(0) } catch (error) { /* ignore */ }
        flashEmotion(heavy ? 'cry' : 'surprised', heavy ? 3200 : 1400)
        say(heavy ? pick(['呜哇——好疼！', '啪叽……']) : pick(['哇——', '绊、绊到了！']), heavy ? 'cry' : 'surprised')
        if (heavy) {
          rice.cryUntil = now + 3800
          setTimeout(() => {
            if (mountedRef.current && riceRef.current.phase === 'chase') {
              say(pick(['呜呜……膝盖好痛……', '好痛好痛好痛……', '要、要吹吹才能起来……']), 'cry')
            }
          }, 1900)
        }
      }

      /** The rice-bowl chase: notice, chase, jump, trip, eat or give up in a huff. */
      function tickRice(live, layout, now) {
        const rice = riceRef.current
        const point = { x: rice.lastBowlX, y: rice.lastBowlY }
        const floor = window.innerHeight - LIVE_FLOOR_PAD
        const dx = point.x - layout.x
        if (menuOpenRef.current || sleepingRef.current || chatOpenRef.current) return

        if (rice.phase === 'notice') {
          if (now - rice.noticeAt > 620) { rice.phase = 'chase'; rice.chaseAt = now }
          return
        }
        if (rice.phase === 'eat') {
          if (now - rice.eatAt > 900) dismissRice(false)
          return
        }
        if (rice.phase === 'angry') {
          if (now - rice.angryAt > 14000) {
            dismissRice(false)
            say(pick(['……哼。不玩了。', '不理你了。', '自己吃吧！']), 'annoyed')
            setStats((prev) => ({ ...prev, happiness: clamp(prev.happiness - 4, 0, 100) }))
          }
          return
        }
        if (rice.phase !== 'chase') return
        if (layout.mode === 'drag' || layout.mode === 'tumble') return
        if (now < rice.tumbleUntil) return
        if (now < rice.cryUntil) return
        if (rice.heavy && layout.mode === 'sit') {
          rice.heavy = false
          try { live.do('stand') } catch (error) { /* ignore */ }
          return
        }

        // stretch her arms toward the bowl: out in front when low, both up when it is overhead
        const bowlHigh = point.y < floor - 150
        const nearBowl = Math.abs(dx)
        let reachAmount = 0
        if (nearBowl < 200) reachAmount = bowlHigh ? 1 : (nearBowl < 120 ? 0.95 : 0.55)
        else if (nearBowl < 360) reachAmount = 0.35
        try { live.reach?.(reachAmount, { high: bowlHigh }) } catch (error) { /* ignore */ }

        // close enough to grab it (on the ground, or mid-jump for a high bowl)
        const inAir = layout.mode === 'air'
        const grabX = inAir ? 74 : 38
        if (Math.abs(dx) < grabX && (point.y > floor - 118 || (inAir && point.y > floor - 330))) {
          eatRice()
          return
        }

        // held out of reach overhead: run under it and jump for it
        if (Math.abs(dx) < 90 && point.y < floor - 150) {
          if (now - rice.jumpAt > 950 && layout.mode !== 'air' && layout.mode !== 'crouch') {
            rice.jumpAt = now
            rice.walkTarget = 0
            try { live.do('jump') } catch (error) { /* ignore */ }
            if (now - rice.lastSayAt > 2400) {
              rice.lastSayAt = now
              say(pick(['够、够不到……', '咻——！', '再高一点点！']), 'determined')
            }
          }
          if (now - rice.chaseAt > 16000) giveUpChase(live, layout)
          return
        }

        // otherwise chase it; re-target when the cursor moves a lot
        if (rice.walkTarget && Math.abs(rice.walkTarget - point.x) > 90) {
          try { live.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
          rice.walkTarget = 0
        }
        if (layout.mode !== 'walk' && layout.mode !== 'run') {
          rice.walkTarget = clamp(point.x, LIVE_INSET, window.innerWidth - LIVE_INSET)
          rice.walkId = `rice-${Math.round(now)}`
          try { live.body?.walk?.(rice.walkTarget, Math.abs(dx) > 240, rice.walkId) } catch (error) { /* ignore */ }
        }

        // tripped by a sharp cursor feint, or just by running too eagerly
        const dir = Math.sign(dx) || 1
        if (rice.lastDir && dir !== rice.lastDir && Math.abs(dx) > 120 && now - rice.dirFlipAt > 520) {
          rice.dirFlipAt = now
          if (Math.random() < 0.42) startTumble(live, layout, Math.abs(dx) > 330)
        }
        rice.lastDir = dir
        if (layout.mode === 'run' && Math.random() < 0.00035) startTumble(live, layout, false)

        if (now - rice.chaseAt > 16000) giveUpChase(live, layout)
      }

      function giveUpChase(live, layout) {
        const rice = riceRef.current
        if (rice.phase === 'angry' || rice.phase === 'off') return
        rice.phase = 'angry'
        rice.angryAt = performance.now()
        rice.walkTarget = 0
        rice.lastDir = 0
        try { live.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
        const cursor = cursorRef.current
        const awayDir = cursor.active && cursor.x >= layout.x ? -1 : 1
        try { live.body?.place?.(layout.x, awayDir) } catch (error) { /* ignore */ }
        say(pick(['不追了！你根本在耍我！', '哼！白饭有什么好吃的！', '你、你走开啦！']), 'angry')
        flashEmotion('annoyed', 2800)
      }

      // -------------------------------------------------------------------
      // Soul: favor, temper, personality, clinginess and the ugly side
      // -------------------------------------------------------------------

      function commitSoul(updater) {
        setSoul((prev) => {
          const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
          soulRef.current = next
          return next
        })
      }

      function personaOf() {
        return PERSONAS[soulRef.current.persona] || PERSONAS.tsundere
      }

      function soulAngry() {
        return soulRef.current.angryUntil > Date.now()
      }

      function favorBand() {
        const favor = soulRef.current.favor
        if (favor < 25) return 'frozen'
        if (favor < 45) return 'cold'
        if (favor < 60) return 'meh'
        if (favor < 80) return 'warm'
        return 'clingy'
      }

      function adjustFavor(delta, reason) {
        const soul = soulRef.current
        const next = clamp(soul.favor + delta, 0, 100)
        if (Math.abs(next - soul.favor) < 0.005) return
        commitSoul((s) => ({ ...s, favor: next, lastInteractionAt: Date.now() }))
        if (reason) pushEvent(reason)
      }

      function adjustTrait(name, delta) {
        commitSoul((s) => ({
          ...s,
          traits: { ...s.traits, [name]: clamp((s.traits[name] || 0) + delta, 0, 100) },
        }))
      }

      function touchSoul() {
        lastInteractionRef.current = Date.now()
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      // -----------------------------------------------------------------
      // Personality engine: OCEAN + mood + needs + a learnable appraisal layer
      // -----------------------------------------------------------------

      function computeEmotion(soul) {
        const ocean = soul.ocean
        const mood = soul.mood
        const needs = soul.needs
        const rel = soul.relation
        const v = mood.valence / 100
        const stress = mood.stress / 100
        const scores = {
          joy: clamp(35 + v * 55 + (ocean.E - 50) * 0.25, 0, 100),
          affection: clamp(20 + v * 40 + (rel.trust - 50) * 0.5 + (ocean.A - 50) * 0.2, 0, 100),
          sadness: clamp(15 - v * 50 + (ocean.N - 50) * 0.3 + (60 - needs.belonging) * 0.35, 0, 100),
          anger: clamp(8 - v * 35 + (rel.resentment || 0) * 0.5 + (ocean.N - 50) * 0.25, 0, 100),
          anxiety: clamp(6 + stress * 55 + (ocean.N - 50) * 0.35 + (55 - rel.security) * 0.25, 0, 100),
          pride: clamp(20 + (ocean.C - 50) * 0.3 + needs.competence * 0.15 + v * 15, 0, 100),
          shame: clamp(8 + (55 - ocean.E) * 0.25 + stress * 30, 0, 100),
          calm: clamp(45 + v * 20 - stress * 25 - Math.abs(ocean.N - 50) * 0.15, 0, 100),
        }
        const pairs = [
          ['happy', scores.joy], ['love', scores.affection], ['sad', scores.sadness],
          ['annoyed', scores.anger], ['worried', scores.anxiety], ['proud', scores.pride],
          ['shy', scores.shame], ['content', scores.calm],
        ]
        let best = pairs[0]
        for (const pair of pairs) if (pair[1] > best[1]) best = pair
        return { scores, token: best[0], intensity: Math.round(clamp(best[1], 0, 100)) }
      }

      function decayMood() {
        const soul = soulRef.current
        const now = Date.now()
        if (now - (soul.lastDecayAt || 0) < 90000) return
        commitSoul((s) => ({
          ...s,
          lastDecayAt: now,
          mood: {
            valence: clamp(s.mood.valence + (0 - s.mood.valence) * 0.05, -100, 100),
            arousal: clamp(s.mood.arousal + (45 - s.mood.arousal) * 0.06, 0, 100),
            stress: clamp(s.mood.stress + (22 - s.mood.stress) * 0.06, 0, 100),
          },
          needs: {
            belonging: clamp(s.needs.belonging + (s.needs.belonging < 50 ? 0.8 : -0.1), 0, 100),
            autonomy: clamp(s.needs.autonomy + (s.needs.autonomy < 50 ? 0.5 : -0.1), 0, 100),
            competence: clamp(s.needs.competence + (s.needs.competence < 50 ? 0.5 : -0.1), 0, 100),
          },
          relation: { ...s.relation, resentment: clamp(s.relation.resentment * 0.985, 0, 100) },
        }))
      }

      function refreshEmotion() {
        const soul = soulRef.current
        const next = computeEmotion(soul)
        if (next.token !== soul.emotion || Math.abs(next.intensity - (soul.emotionIntensity || 0)) > 6) {
          commitSoul((s) => ({ ...s, emotion: next.token, emotionIntensity: next.intensity }))
          if (!soulAngry() && next.intensity > 58 && !typingRef.current) flashEmotion(next.token, 2600)
        }
        return next
      }

      const APPRAISAL_EVENTS = {
        pet: { val: 12, needs: { belonging: 4 }, rel: { trust: 1.2 }, care: 2 },
        feed: { val: 10, needs: { belonging: 3 }, rel: { trust: 0.8 }, care: 2 },
        play: { val: 11, needs: { belonging: 4, competence: 2 }, rel: { trust: 1 }, care: 1.5 },
        riceWin: { val: 16, needs: { competence: 5, belonging: 2 }, rel: { trust: 1 }, care: 1 },
        riceDismiss: { val: -18, needs: { autonomy: -2 }, rel: { trust: -2.5, resentment: 4 } },
        helpAccept: { val: 14, needs: { competence: 3, belonging: 4 }, rel: { trust: 2.5 }, care: 2 },
        helpDecline: { val: -12, rel: { trust: -3, resentment: 3 } },
        chatGood: { val: 8, needs: { belonging: 3 }, rel: { trust: 1 }, care: 1 },
        chatCold: { val: -6, rel: { trust: -1, resentment: 1 } },
        ignore: { val: -4, needs: { belonging: -3 }, rel: { trust: -0.6, resentment: 1.2, security: -0.4 } },
        drag: { val: -6, stress: 6 },
        work: { val: 2, needs: { belonging: -1 } },
        pet_head: { val: 13, needs: { belonging: 4 }, rel: { trust: 1.5, security: 1 }, care: 2 },
        pet_tail: { val: -12, rel: { trust: -1, resentment: 3 }, stress: 4 },
        pet_feet: { val: 6, needs: { belonging: 1 }, care: 1 },
        apology: { val: 15, rel: { trust: 3, resentment: -6, security: 2 } },
      }

      function appraise(type, intensity = 1, options = {}) {
        const soul = soulRef.current
        const spec = APPRAISAL_EVENTS[type]
        if (!spec) return null
        const learned = clamp(Number(soul.appraisal[type]) || 0.5, 0.1, 2)
        const k = clamp(intensity, 0, 1.5) * learned
        const ocean = soul.ocean
        const positive = (spec.val || 0) >= 0
        const sensitivity = positive
          ? 1 + (ocean.E - 50) / 200 + (ocean.A - 50) / 200
          : 1 + (ocean.N - 50) / 120
        const delta = { valence: 0, arousal: 0, stress: 0 }
        delta.valence += (spec.val || 0) * k * sensitivity
        delta.arousal += (positive ? 4 : 7) * k * (1 + (ocean.N - 50) / 150)
        delta.stress += (spec.stress || 0) * k + (positive ? 0 : 3 * k * (1 + (ocean.N - 50) / 150))
        const needs = { ...soul.needs }
        if (spec.needs) for (const key of Object.keys(spec.needs)) needs[key] = clamp(needs[key] + spec.needs[key] * k, 0, 100)
        const rel = { ...soul.relation }
        if (spec.rel) for (const key of Object.keys(spec.rel)) rel[key] = clamp(rel[key] + spec.rel[key] * k, 0, 100)
        const gapMin = (Date.now() - (soul.lastInteractionAt || Date.now())) / 60000
        const userTriggered = options.user !== false
        const userModel = { ...soul.userModel }
        if (userTriggered) {
          userModel.care = clamp(userModel.care * 0.98 + (spec.care || 0) * k * 0.5, 0, 100)
          userModel.responsiveness = clamp(userModel.responsiveness * 0.97 + clamp(10 - gapMin, -8, 10) * 0.3, 0, 100)
          const hour = new Date().getHours()
          userModel.activeHours = { ...userModel.activeHours, [hour]: (userModel.activeHours[hour] || 0) + 1 }
          userModel.updatedAt = Date.now()
        }
        const targetWeight = clamp(0.5 + Math.abs(delta.valence) / 24, 0.3, 1.8)
        const appraisal = { ...soul.appraisal, [type]: clamp(learned * 0.97 + targetWeight * 0.03, 0.15, 1.9) }
        const predicted = computeEmotion({
          ...soul,
          mood: { ...soul.mood, valence: clamp(soul.mood.valence + delta.valence, -100, 100) },
        })
        const memory = [...(soul.memory || []), {
          at: Date.now(), type, intensity: Number(k.toFixed(2)), emotion: predicted.token,
        }].slice(-24)
        commitSoul((s) => ({
          ...s,
          mood: {
            valence: clamp(s.mood.valence + delta.valence, -100, 100),
            arousal: clamp(s.mood.arousal + delta.arousal, 0, 100),
            stress: clamp(s.mood.stress + delta.stress, 0, 100),
          },
          needs,
          relation: rel,
          appraisal,
          memory,
          userModel,
          eventsSinceReflect: (s.eventsSinceReflect || 0) + 1,
        }))
        const emotion = refreshEmotion()
        maybeReflect()
        const brainEvents = ['pet', 'pet_head', 'pet_tail', 'pet_feet', 'feed', 'play', 'riceWin', 'riceDismiss', 'helpAccept', 'helpDecline', 'drag', 'ignore']
        if (!options.noBrain && brainEvents.includes(type)) askBrain(type, { intensity: k })
        return { delta, emotion }
      }

      function askBrain(eventType, detail) {
        if (systemSleepingRef.current) return
        const soul = soulRef.current
        if (!soul.settings.brain) return
        if (!aiStateRef.current.ai) return
        const now = Date.now()
        if (now - (soul.lastBrainAt || 0) < 20000) return
        commitSoul((s) => ({ ...s, lastBrainAt: now }))
        const profile = {
          personaLabel: PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '',
          customPersona: soul.customPersona || '',
          ocean: soul.ocean,
          mood: soul.mood,
          needs: soul.needs,
          relation: soul.relation,
          favor: Math.round(soul.favor),
          emotion: soul.emotion,
          emotionIntensity: soul.emotionIntensity,
          warped: !!soul.warped,
          angry: soulAngry(),
          selfNarrative: soul.selfNarrative || '',
          beliefs: (soul.beliefs || []).slice(-3),
          userModel: {
            responsiveness: Math.round(soul.userModel.responsiveness),
            care: Math.round(soul.userModel.care),
            presence: Math.round(soul.userModel.presence),
          },
          task: taskTitle(),
          userWorking: userWorkRef.current.keys >= 20 && now - userWorkRef.current.lastKeyAt < 180000,
          hour: new Date().getHours(),
        }
        const event = {
          type: eventType,
          intensity: detail && Number.isFinite(detail.intensity) ? detail.intensity : 0.6,
          detail: detail && detail.detail ? String(detail.detail).slice(0, 80) : '',
        }
        const recent = (soul.memory || []).slice(-8).map((item) => ({ type: item.type, intensity: item.intensity, emotion: item.emotion }))
        try {
          fetch('/fatfish-pet/brain', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ profile, event, recent, model: soulRef.current.modelSelection }),
          }).then((response) => response.json()).then((payload) => {
            if (payload && payload.ok && payload.brain) applyBrain(payload.brain)
          }).catch(() => {})
        } catch (error) { /* ignore */ }
      }

      function applyBrain(brain) {
        if (!brain || typeof brain !== 'object') return
        const emotion = EMOTIONS.has(brain.emotion) ? brain.emotion : null
        const moodDelta = brain.moodDelta || {}
        const relationDelta = brain.relationDelta || {}
        const soften = (value, negativeScale) => {
          const n = Number(value) || 0
          return n < 0 ? n * negativeScale : n
        }
        const valenceDelta = soften(moodDelta.valence, 0.5)
        const stressDelta = soften(moodDelta.stress, 0.5)
        const trustDelta = soften(relationDelta.trust, 0.6)
        const resentmentDelta = soften(relationDelta.resentment, 0.5)
        commitSoul((s) => ({
          ...s,
          mood: {
            valence: clamp(s.mood.valence + valenceDelta, -100, 100),
            arousal: s.mood.arousal,
            stress: clamp(s.mood.stress + stressDelta, 0, 100),
          },
          relation: {
            ...s.relation,
            trust: clamp(s.relation.trust + trustDelta, 0, 100),
            resentment: clamp(s.relation.resentment + resentmentDelta, 0, 100),
          },
          brainCount: (s.brainCount || 0) + 1,
          memory: brain.memory
            ? [...(s.memory || []), { at: Date.now(), type: 'brain_memory', intensity: 1, emotion: emotion || s.emotion, note: String(brain.memory).slice(0, 40) }].slice(-24)
            : s.memory,
        }))
        if (emotion && !soulAngry() && !brain.line) flashEmotion(emotion, 3600)
        if (brain.line) say(brain.line, { emotion: emotion || undefined, action: brain.action && ACTIONS.has(brain.action) ? brain.action : undefined, intent: brain.intent })
        refreshMoodStage()
        if (brain.action && brain.action !== 'none' && ACTIONS.has(brain.action) && !brain.line) runAction(brain.action)
        if (brain.intent === 'offer_help' && !helpOfferRef.current && !soulAngry()) offerHelp()
        else if (brain.intent === 'seek_attention' && !soulAngry()) {
          const layout = liveLayout()
          if (layout) {
            const target = clamp(layout.x + rand(-160, 160), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 80) liveWalk(target, false, 'brain-seek-' + Date.now())
          }
        } else if (brain.intent === 'sulk' && !soulAngry()) {
          startAnger(brain.line || pick(personaOf().angry), 18000)
        } else if (brain.intent === 'obstruct' && soulAngry()) {
          const cursorNow = cursorRef.current
          if (cursorNow.active) liveWalk(clamp(cursorNow.x - 70, LIVE_INSET, window.innerWidth - LIVE_INSET), false, 'huff-' + Date.now())
        } else if (brain.intent === 'wander' && !soulAngry()) {
          const target = rand(LIVE_INSET, window.innerWidth - LIVE_INSET)
          liveWalk(target, false, 'brain-wander-' + Date.now())
        }
      }

      function maybeReflect(force) {
        const soul = soulRef.current
        if (soul.reflectionBusy) return
        const events = soul.eventsSinceReflect || 0
        const idleMs = Date.now() - (soul.lastReflectAt || 0)
        if (!force && events < 12 && idleMs < 45 * 60000) return
        if (idleMs < 5 * 60000) return
        reflectSoul(force)
      }

      async function reflectSoul(force) {
        const soul = soulRef.current
        if (soul.reflectionBusy) return
        commitSoul((s) => ({ ...s, reflectionBusy: true, lastReflectAt: Date.now(), eventsSinceReflect: 0 }))
        const profile = {
          persona: soul.persona,
          personaLabel: PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '',
          customPersona: soul.customPersona || '',
          ocean: soul.ocean,
          mood: soul.mood,
          needs: soul.needs,
          relation: soul.relation,
          favor: Math.round(soul.favor),
          warped: !!soul.warped,
          angry: soulAngry(),
          emotion: soul.emotion,
          emotionIntensity: soul.emotionIntensity,
          beliefs: soul.beliefs || [],
          selfNarrative: soul.selfNarrative || '',
          userModel: {
            responsiveness: Math.round(soul.userModel.responsiveness),
            care: Math.round(soul.userModel.care),
            presence: Math.round(soul.userModel.presence),
          },
          appraisal: soul.appraisal,
        }
        const recent = (soul.memory || []).slice(-16).map((event) => ({ type: event.type, intensity: event.intensity, emotion: event.emotion, at: event.at }))
        try {
          const response = await fetch('/fatfish-pet/reflect', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ profile, recent, model: soulRef.current.modelSelection }),
          })
          const payload = await response.json()
          if (payload && payload.ok && payload.reflection) applyReflection(payload.reflection)
          else if (force) showToast('她没能静下心来想…', 2200)
        } catch (error) {
          if (force) showToast('反思失败，鱼脑子卡住了…', 2200)
        }
        commitSoul((s) => ({ ...s, reflectionBusy: false }))
      }

      function applyReflection(reflection) {
        commitSoul((s) => {
          const ocean = { ...s.ocean }
          for (const key of ['O', 'C', 'E', 'A', 'N']) {
            ocean[key] = clamp(ocean[key] + (Number(reflection.traitDeltas && reflection.traitDeltas[key]) || 0), 0, 100)
          }
          const mood = {
            ...s.mood,
            valence: clamp(s.mood.valence + (Number(reflection.moodNudge && reflection.moodNudge.valence) || 0), -100, 100),
            stress: clamp(s.mood.stress + (Number(reflection.moodNudge && reflection.moodNudge.stress) || 0), 0, 100),
          }
          const beliefs = [...(s.beliefs || []), ...(Array.isArray(reflection.beliefs) ? reflection.beliefs : [])].slice(-6)
          return {
            ...s,
            ocean,
            mood,
            beliefs,
            selfNarrative: typeof reflection.selfNarrative === 'string' && reflection.selfNarrative ? reflection.selfNarrative : s.selfNarrative,
            reflections: (s.reflections || 0) + 1,
          }
        })
        pushEvent('完成了一次自我反思')
        refreshEmotion()
        if (Math.random() < 0.6) say('……我好像和刚来的时候，不太一样了。', 'thinking')
      }

      function startAnger(reason, extraMs) {
        const soul = soulRef.current
        if (soul.gone) return
        const persona = personaOf()
        const until = Date.now() + Math.round((45000 + (extraMs || 0)) * (persona.angerMul || 1))
        commitSoul((s) => ({
          ...s,
          angryUntil: Math.max(s.angryUntil, until),
          ignoreUntil: Math.max(s.ignoreUntil, until - 6000),
          angerCount: (s.angerCount || 0) + 1,
          traits: { ...s.traits, jealousy: clamp((s.traits.jealousy || 0) + 4, 0, 100) },
        }))
        setAngry(true)
        setHelpOffer(null)
        say(reason || pick(persona.angry), 'angry')
        flashEmotion('angry', 2800)
        try { liveRef.current?.do?.('angry') } catch (error) { /* ignore */ }
        beepAngry()
      }

      function endAnger() {
        if (!soulAngry()) return
        commitSoul((s) => ({ ...s, angryUntil: 0, ignoreUntil: 0 }))
        setAngry(false)
        const yandere = soulRef.current.persona === 'yandere'
        say(pick(yandere ? ['……暂时原谅你。', '别再让我等。'] : ['哼，这次先放过你。', '……勉强原谅你了。']), 'pout')
      }

      function beepAngry() {
        if (!soulRef.current.settings.noise) return
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext
          if (!Ctx) return
          if (!audioCtxRef.current) audioCtxRef.current = new Ctx()
          const ctx = audioCtxRef.current
          if (ctx.state === 'suspended') ctx.resume().catch(() => {})
          const now = ctx.currentTime
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(440, now)
          osc.frequency.exponentialRampToValueAtTime(170, now + .18)
          gain.gain.setValueAtTime(.05, now)
          gain.gain.exponentialRampToValueAtTime(.001, now + .26)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + .28)
        } catch (error) { /* audio may be blocked */ }
      }

      function vanishAway() {
        const soul = soulRef.current
        const sad = computeEmotion(soul).scores.sadness
        if (soul.gone || (soul.favor >= 45 && sad <= 68)) return
        const layout = liveLayout()
        const goLeft = !layout || layout.x < window.innerWidth / 2
        setKitRoam?.(false)
        try { liveWalk(goLeft ? LIVE_INSET : window.innerWidth - LIVE_INSET, true, `vanish-${Date.now()}`) } catch (error) { /* ignore */ }
        flashEmotion('sad', 2400)
        say(pick(['……我出去一下。', '……不想理你。', '别找我。']), 'sad')
        setTimeout(() => {
          if (!mountedRef.current) return
          commitSoul((s) => ({
            ...s,
            gone: true,
            vanishUntil: Date.now() + rand(7, 16) * 60000,
            lastInteractionAt: Date.now(),
          }))
          riceRef.current.phase = 'off'
          riceRef.current.walkTarget = 0
          setRiceOn(false)
          setVisible(false)
          saveState()
        }, 1400)
      }

      function returnFromGone() {
        commitSoul((s) => ({
          ...s,
          gone: false,
          vanishUntil: 0,
          favor: clamp(s.favor + 2, 0, 100),
          lastInteractionAt: Date.now(),
        }))
        setVisible(true)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(pick(['……我回来了。', '只是刚好路过。', '不是想你了。']), 'shy')
          flashEmotion('shy', 2200)
        }, 1000)
      }

      function taskTitle() {
        try {
          const title = String(document.title || '')
          return title.split('—')[0].split('-')[0].trim().slice(0, 30) || '手上的事'
        } catch (error) {
          return '手上的事'
        }
      }

      function offerHelp() {
        const task = taskTitle()
        setHelpOffer({ task })
        commitSoul((s) => ({ ...s, lastOfferAt: Date.now() }))
        say(pick([`你在忙「${task}」吗？要不要我帮忙？`, `我一直在看……「${task}」，要帮忙吗？`]), 'curious')
        flashEmotion('curious', 3200)
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      function appendPetMessage(text) {
        const value = String(text || '').trim()
        if (!value) return
        setMessages((prev) => [...prev, { id: uid(), role: 'pet', text: value.slice(0, 2000), ts: Date.now() }].slice(-40))
      }

      function applyAgentAction(action) {
        if (!action || typeof action !== 'object') return
        if (action.kind === 'say' && action.text) {
          // Agent task answers belong in the chat transcript; a long speech bubble over
          // the pet covers the desktop and is hard to read.
          appendPetMessage(action.text)
        } else if (action.kind === 'act' && action.action && ACTIONS.has(action.action)) {
          runAction(action.action)
        } else if (action.kind === 'tool' && action.text) {
          showToast(action.text, 1800)
        } else if (action.kind === 'remember' && action.note) {
          commitSoul((s) => ({
            ...s,
            memory: [...(s.memory || []), { at: Date.now(), type: 'agent_memory', intensity: 1, emotion: s.emotion, note: String(action.note).slice(0, 40) }].slice(-24),
          }))
          showToast('她记下了一件事。', 1800)
        } else if (action.kind === 'remind' && action.minutes && action.text) {
          const ms = clamp(Number(action.minutes) * 60000, 60000, 6 * 3600000)
          showToast('会在 ' + Math.round(ms / 60000) + ' 分钟后提醒：' + action.text, 3200)
          setTimeout(() => {
            if (!mountedRef.current) return
            say('提醒你：' + action.text, 'happy')
            playAction('nod', 600)
          }, ms)
        } else if (action.kind === 'delegate' && action.task) {
          if (soulRef.current.settings.delegateAgent) {
            try {
              fetch('/fatfish-pet/feedback', {
                method: 'POST',
                headers: { 'content-type': 'application/json', accept: 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ message: '大肥鱼想请主 Agent 处理：' + action.task }),
              }).then((response) => response.json()).then((payload) => {
                if (payload && payload.ok && payload.delivered) showToast('她把任务交给主 Agent 了。', 2200)
                else showToast('主 Agent 暂时不在，任务先记下了。', 2400)
              }).catch(() => {})
            } catch (error) { /* ignore */ }
          } else {
            const message = '这个任务超出我现在能做的范围。你可以在设置里打开「任务交给主 Agent」，我就能转给主 Agent。'
            say(message, 'thinking')
            appendPetMessage(message)
          }
        }
      }

      function runPetAgent(goal, context) {
        const soul = soulRef.current
        if (systemSleepingRef.current) return false
        if (!soul.settings.agent || !aiStateRef.current.ai || agentBusyRef.current) return false
        if (!goal) return false
        agentBusyRef.current = true
        const controller = new AbortController()
        agentAbortRef.current = controller
        commitSoul((s) => ({ ...s, lastAgentAt: Date.now() }))
        if (context && context.openChat) openChat()
        say('嗯……我想想。', 'thinking')
        const state = {
          persona: soul.persona,
          moodStage: soul.moodStage,
          mood: soul.mood,
          favor: Math.round(soul.favor),
          relation: soul.relation,
          needs: soul.needs,
          emotion: soul.emotion,
          selfNarrative: soul.selfNarrative || '',
          task: taskTitle(),
          userWorking: userWorkRef.current.keys >= 20 && Date.now() - userWorkRef.current.lastKeyAt < 180000,
        }
        try {
          fetch('/fatfish-pet/agent', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            signal: controller.signal,
            body: JSON.stringify({
              goal: String(goal).slice(0, 400),
              context: context || {},
              state: state,
              permission: soul.settings.permission || 0,
              workspace: soul.settings.workspace || '',
              allowDelegate: !!soul.settings.delegateAgent,
              agentOptions: {
                maxSteps: soul.settings.agentSteps,
                maxSearchResults: soul.settings.agentSearchResults,
                maxFetchChars: soul.settings.agentFetchChars,
                timeoutSec: soul.settings.agentTimeoutSec,
                temperature: soul.settings.agentTemperature,
                maxAnswerChars: soul.settings.agentAnswerChars,
                web: soul.settings.agentWeb !== false,
              },
              model: soul.modelSelection,
            }),
          }).then((response) => response.json()).then((payload) => {
            if (!payload || !payload.ok) { say('……我暂时想不出办法。', 'sad'); appendPetMessage('……我暂时想不出办法。'); return }
            const actions = Array.isArray(payload.actions) ? payload.actions : []
            commitSoul((s) => ({ ...s, agentRuns: (s.agentRuns || 0) + 1 }))
            if (!actions.length) { say('嗯……让我再想想。', 'thinking'); appendPetMessage('嗯……让我再想想。'); return }
            actions.forEach((action, index) => {
              setTimeout(() => {
                if (mountedRef.current && !systemSleepingRef.current) applyAgentAction(action)
              }, index * 1400)
            })
          }).catch(() => {
            if (systemSleepingRef.current) return
            say('……好像连不上我的思考模块。', 'sad')
            appendPetMessage('……好像连不上我的思考模块。')
          }).finally(() => {
            if (agentAbortRef.current === controller) agentAbortRef.current = null
            agentBusyRef.current = false
          })
        } catch (error) {
          if (agentAbortRef.current === controller) agentAbortRef.current = null
          agentBusyRef.current = false
        }
        return true
      }

      function currentPermissionLabel() {
        const permission = soulRef.current.settings.permission || 0
        if (permission <= 0) return '0 · 只能聊天、记忆、提醒'
        if (permission === 1) return '1 · 可只读工作区'
        if (permission === 2) return '2 · 可读写工作区'
        return '3 · 完全授权（可执行命令）'
      }

      function submitAgentAsk() {
        const goal = agentAskText.trim()
        if (!goal) { showToast('先告诉她想做什么。', 1800); return }
        if (!soulRef.current.settings.agent) { showToast('Agent 模式已关闭，请先在设置里开启。', 2400); return }
        setAgentAskOpen(false)
        setAgentAskText('')
        openChat()
        setMessages((prev) => [...prev, { id: uid(), role: 'user', text: goal, ts: Date.now() }].slice(-40))
        const started = runPetAgent(goal, { trigger: 'ask_panel', openChat: true })
        if (!started) {
          showToast('AI 暂时不可用。', 2400)
          appendPetMessage('……我现在没法帮你处理这个。')
        }
      }

      function acceptHelp() {
        const offer = helpOffer
        const task = offer ? offer.task : taskTitle()
        setHelpOffer(null)
        adjustFavor(2.5, '接受了大肥鱼的帮忙')
        appraise('helpAccept', 1)
        adjustTrait('dependence', 3)
        commitSoul((s) => ({ ...s, helpCount: (s.helpCount || 0) + 1, lastInteractionAt: Date.now() }))
        say(pick(['好——交给我！', '我看看，马上！']), 'happy')
        setTimeout(() => {
          if (!mountedRef.current) return
          const ok = runPetAgent(
            `主人接受了你的帮忙请求。请先回应一句，再给出 1~2 条针对「${task}」的具体、可马上执行的帮助；如果这件事需要直接改代码或操作电脑，就用 delegate。`,
            { task: task, userWorking: true, openChat: true },
          )
          if (!ok) say('唔……我的 Agent 好像还没准备好。', 'sad')
        }, 600)
      }

      function declineHelp() {
        setHelpOffer(null)
        adjustFavor(-1.2, '拒绝了大肥鱼的帮忙')
        appraise('helpDecline', 1)
        adjustTrait('jealousy', 3)
        say(pick(['哦……好吧。', '那你自己忙吧。', '哼，不需要就算了。']), 'pout')
        if (soulRef.current.warped) startAnger('……你总是这样。', 20000)
      }

      function evaluateWarp() {
        const s = soulRef.current
        const ignoredMin = (Date.now() - (s.lastInteractionAt || Date.now())) / 60000
        const score = (s.traits.jealousy || 0) * .9
          + (s.persona === 'yandere' ? 35 : 0)
          + (s.favor > 82 ? 8 : 0)
          + Math.min(35, ignoredMin)
          + (s.ocean ? s.ocean.N * .25 : 0)
          + (100 - (s.userModel ? s.userModel.responsiveness : 50)) * .15
        if (!s.warped && s.persona && score >= 105) {
          commitSoul((x) => ({ ...x, warped: true }))
          say(pick(['你最近……好像总在躲我。', '为什么不多看看我。', '没关系，我会让你只看我的。']), 'pout')
          flashEmotion('pout', 4200)
        } else if (s.warped && (s.traits.jealousy || 0) < 24 && ignoredMin < 5) {
          commitSoul((x) => ({ ...x, warped: false }))
        }
      }

      function lockUserScreen() {
        const soul = soulRef.current
        if (lockActiveRef.current || !soul.settings.lock) return
        if (Date.now() - (soul.lastLockAt || 0) < 30 * 60000) return
        lockActiveRef.current = true
        commitSoul((s) => ({ ...s, lastLockAt: Date.now(), lastInteractionAt: Date.now() }))
        setLockActive(true)
        setLockText('')
        flashEmotion('pout', 3200)
        beepAngry()
      }

      function unlockScreen(apologized) {
        if (!lockActiveRef.current) return
        lockActiveRef.current = false
        setLockActive(false)
        if (apologized) {
          adjustFavor(1.5, '向大肥鱼道歉')
          appraise('apology', 1)
          adjustTrait('jealousy', -6)
          say(pick(['……这次就算了。', '真的知道错了？', '哼……勉强相信你。']), 'shy')
        } else {
          adjustFavor(-2, '没有回应她')
          say(pick(['……算了。', '你走吧。']), 'sad')
        }
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      function tickSoul() {
        if (systemSleepingRef.current) return
        const s = soulRef.current
        const now = Date.now()
        if (s.gone) {
          if (now > s.vanishUntil) returnFromGone()
          return
        }
        const ignoredMin = (now - (s.lastInteractionAt || now)) / 60000
        decayMood()
        if (ignoredMin > 25) {
          commitSoul((x) => ({
            ...x,
            favor: clamp(x.favor - 0.12, 0, 100),
            traits: { ...x.traits, jealousy: clamp((x.traits.jealousy || 0) + 0.2, 0, 100) },
          }))
        }
        if (ignoredMin > 25 && now - (s.lastIgnoreAt || 0) > 8 * 60000) {
          commitSoul((x) => ({ ...x, lastIgnoreAt: now }))
          appraise('ignore', Math.min(0.9, ignoredMin / 35), { user: false })
        }
        const work = userWorkRef.current
        const working = work.keys >= 20 && now - work.lastKeyAt < 180000
        if (working) {
          commitSoul((x) => ({
            ...x,
            userModel: { ...x.userModel, presence: clamp(x.userModel.presence * 0.98 + 2, 0, 100) },
          }))
          if (!soulAngry() && now - (s.lastWorkAppraiseAt || 0) > 6 * 60000) {
            commitSoul((x) => ({ ...x, lastWorkAppraiseAt: now }))
            appraise('work', 0.3)
          }
        }
        evaluateWarp()
        if (soulAngry() && now > s.angryUntil) endAnger()
        const current = soulRef.current
        const emo = computeEmotion(current)
        if (!soulAngry() && current.favor < 45 && ignoredMin > 3 && Math.random() < .06) vanishAway()
        if (!soulAngry() && emo.scores.sadness > 68 && current.relation.trust < 48 && ignoredMin > 6 && Math.random() < .15) vanishAway()
        if (!soulAngry() && current.warped && current.settings.lock && ignoredMin > 22 && current.favor > 70) lockUserScreen()
        if (!soulAngry() && current.warped && ignoredMin > 12 && Math.random() < .3) startAnger('……你去哪了。')
        if (!soulAngry() && !helpOfferRef.current && (current.favor > 80 || current.needs.competence < 45)
          && current.configured && working && now - (current.lastOfferAt || 0) > 18 * 60000
          && !chatOpenRef.current && riceRef.current.phase === 'off') {
          offerHelp()
        }
        refreshMoodStage()
        const currentNow = soulRef.current
        if (currentNow.dragCount && now - (currentNow.lastDragAt || 0) > 60000) {
          commitSoul((x) => ({ ...x, dragCount: 0 }))
        }
        maybeMoodMotion()
        maybeReflect()
        // Ambient model-driven expressiveness: even when nothing happens, the director
        // model can decide she wants attention, to help, or to act a little.
        if (!soulAngry() && soulRef.current.settings.brain && aiStateRef.current.ai
          && now - (soulRef.current.lastBrainAt || 0) > 120000 && Math.random() < 0.5) {
          askBrain('ambient', { intensity: 0.4, detail: ignoredMin > 5 ? '用户已经很久没有互动了' : '安静的日常' })
        }
      }

      function computeStage(soul) {
        if (soulAngry()) return 'angry'
        const emo = computeEmotion(soul)
        if (emo.scores.anxiety > 62 && soul.relation.security < 45) return 'scared'
        if (emo.scores.shame > 62 && soul.mood.valence > -10) return 'shy'
        if (soul.mood.valence > 32) return 'joyful'
        if (soul.mood.valence < -22) return 'low'
        if (soul.needs.belonging < 38 || soul.favor > 82) return 'clingy'
        return 'calm'
      }

      function refreshMoodStage(force) {
        const soul = soulRef.current
        const now = Date.now()
        if (!force && soul.stageOverride && now < soul.stageOverrideUntil) return soul.moodStage
        if (!force && soul.moodStage && now - (soul.stageSince || 0) < 12000) return soul.moodStage
        const next = computeStage(soul)
        if (next !== soul.moodStage) {
          commitSoul((s) => ({ ...s, moodStage: next, stageSince: now, stageOverride: '', stageOverrideUntil: 0 }))
          clearTimeout(reactionTimerRef.current)
          setReaction(null)
          const pool = (MOOD_STAGES[next] || MOOD_STAGES.calm).faces
          const face = pool[Math.floor(Math.random() * pool.length)]
          stageFaceRef.current = { token: face, nextAt: now + rand(3800, 7000) }
          setStageFace(face)
          if (!soulAngry() && now - (soul.lastMoodSayAt || 0) > 30000) {
            commitSoul((s) => ({ ...s, lastMoodSayAt: now }))
            const lines = {
              joyful: ['嘿嘿，今天也不错。', '心情好好！'],
              low: ['……有点提不起劲。', '唉。'],
              shy: ['别、别一直看我。'],
              clingy: ['你在忙吗？我在这儿。'],
              scared: ['……你还在吗。'],
              angry: ['哼。'],
              calm: ['……', '这样也挺好。'],
            }
            say(lines[next] ? pick(lines[next]) : '……', face)
          }
        }
        return next
      }

      function setStageOverride(stage, ms) {
        if (!MOOD_STAGES[stage]) return
        const now = Date.now()
        commitSoul((s) => ({ ...s, stageOverride: stage, stageOverrideUntil: now + ms }))
        const pool = MOOD_STAGES[stage].faces
        const face = pool[Math.floor(Math.random() * pool.length)]
        stageFaceRef.current = { token: face, nextAt: now + rand(3800, 7000) }
        setStageFace(face)
      }

      function moodFall(heavy) {
        const live = liveRef.current
        const layout = liveLayout()
        if (!live || !layout || typeof live.tumble !== 'function') return
        const ok = (() => { try { return live.tumble({ heavy: heavy, dir: layout.facing === -1 ? -1 : 1 }) } catch (error) { return false } })()
        if (!ok) return
        const now = Date.now()
        const dur = heavy ? 5200 : 2600
        commitSoul((s) => ({ ...s, fallingUntil: now + dur, fallHeavy: heavy, lastMoodMotionAt: now }))
        setStageOverride('low', dur)
        flashEmotion(heavy ? 'cry' : 'sad', dur)
        say(heavy ? pick(['呜……摔倒了。', '好疼……']) : pick(['啊。', '绊、绊到了。']), heavy ? 'cry' : 'sad')
      }

      function comfortFall() {
        const soul = soulRef.current
        if (!soul.fallingUntil) return
        commitSoul((s) => ({
          ...s,
          fallingUntil: 0,
          fallHeavy: false,
          mood: { ...s.mood, valence: clamp(s.mood.valence + 18, -100, 100), stress: clamp(s.mood.stress - 12, 0, 100) },
          relation: { ...s.relation, trust: clamp(s.relation.trust + 2, 0, 100) },
        }))
        setStageOverride('shy', 6000)
        try { liveRef.current?.do?.('stand') } catch (error) { /* ignore */ }
        say(pick(['呜……你来了。', '抱、抱一下就好了……', '我没事了，嘿嘿。']), 'shy')
        flashEmotion('shy', 4000)
        adjustFavor(1.2)
      }

      function maybeMoodMotion() {
        const soul = soulRef.current
        const now = Date.now()
        if (soul.gone || soulAngry() || soul.fallingUntil > now) return
        if (chatOpenRef.current || sleepingRef.current || menuOpenRef.current || dragRef.current.active) return
        if (riceRef.current.phase !== 'off') return
        if (stateRef.current.bubble || stateRef.current.action !== 'none') return
        if (now - (soul.lastMoodMotionAt || 0) < 22000) return
        const layout = liveLayout()
        if (!layout || ['walk', 'run', 'air', 'tumble', 'drag', 'crouch', 'land'].includes(layout.mode)) return
        const stage = soul.moodStage || 'calm'
        commitSoul((s) => ({ ...s, lastMoodMotionAt: now }))
        if (stage === 'low') {
          if (Math.random() < 0.12) { moodFall(soul.mood.valence < -45); return }
          if (Math.random() < 0.55) {
            const target = clamp(layout.x + rand(-120, 120), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 50) liveWalk(target, false, 'mood-walk-' + now)
            return
          }
          try { liveRef.current?.do?.('sit') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'joyful') {
          if (Math.random() < 0.5) {
            const target = clamp(rand(LIVE_INSET, window.innerWidth - LIVE_INSET), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 140) { liveWalk(target, true, 'mood-run-' + now); return }
          }
          const motions = (MOOD_STAGES.joyful && MOOD_STAGES.joyful.motions) || ['dance']
          try { liveRef.current?.do?.(pick(motions)) } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'angry') {
          try { liveRef.current?.do?.('shake') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'clingy') {
          const cursor = cursorRef.current
          if (cursor.active) {
            const target = clamp(cursor.x - 80, LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 70) liveWalk(target, false, 'mood-follow-' + now)
          }
          return
        }
        if (stage === 'shy') {
          try { liveRef.current?.do?.('shiver') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'scared') {
          try { liveRef.current?.do?.('shiver') } catch (error) { /* ignore */ }
          return
        }
        if (Math.random() < 0.45) {
          const target = clamp(layout.x + rand(-160, 160), LIVE_INSET, window.innerWidth - LIVE_INSET)
          if (Math.abs(target - layout.x) > 60) liveWalk(target, false, 'mood-walk-' + now)
        }
      }

      function clickZone(clientX, clientY) {
        const layout = liveLayout()
        if (!layout) return 'body'
        const floor = window.innerHeight - LIVE_FLOOR_PAD
        const dx = clientX - layout.x
        const dy = clientY - floor
        const height = 176 * (zoomRef.current || 1)
        if (dy < -height * 0.62 && Math.abs(dx) < 78) return 'head'
        if (dy > -height * 0.58 && dy < -10 && dx * (layout.facing || 1) < -34) return 'tail'
        if (dy > -22) return 'feet'
        return 'body'
      }

      function personaReaction(table) {
        const persona = soulRef.current.persona || 'tsundere'
        return table[persona] || table.tsundere || table.gentle
      }

      function reactShy() {
        const entry = personaReaction(PERSONA_SHY)
        const face = entry.face
        const line = pick(entry.lines)
        setStageOverride('shy', 8000)
        flashEmotion(face, 4400)
        say(line, face)
        playAction(entry.action, 800)
        adjustFavor(0.7)
        adjustTrait('closeness', 1)
        appraise('pet_head', 0.65)
      }

      function reactTail() {
        const entry = personaReaction(PERSONA_TAIL)
        const face = entry.face
        flashEmotion(face, 4400)
        say(pick(entry.lines), face)
        playAction(entry.action, 700)
        adjustFavor(-0.3)
        adjustTrait('jealousy', 1)
        appraise('pet_tail', 0.9)
      }

      function petBodyPart(zone) {
        const soul = soulRef.current
        const now = Date.now()
        if (soul.fallingUntil > now) { comfortFall(); return }
        if (soul.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1600)
          return
        }
        touchSoul()
        if (zone === 'head') {
          reactShy()
        } else if (zone === 'tail') {
          reactTail()
          if (now - (soul.lastTailAt || 0) < 8000 && !soulAngry()) startAnger('都说了尾巴不行！', 12000)
          commitSoul((s) => ({ ...s, lastTailAt: now }))
        } else if (zone === 'feet') {
          flashEmotion('surprised', 3200)
          say(pick(['脚、脚底痒！', '哈哈别挠那里！']), 'surprised')
          playAction('wiggle', 600)
          adjustFavor(0.3)
          appraise('pet_feet', 0.5)
        } else {
          const faces = ['shy', 'happy', 'content', 'pout']
          const face = pick(faces)
          flashEmotion(face, 3800)
          say(pick(['嗯？', '摸这里也可以哦。', '……', '要摸摸头吗？']), face)
          playAction('nod', 500)
          adjustFavor(0.5)
          appraise('pet', 0.5)
        }
      }

      function chooseMoodBehavior() {
        const soul = soulRef.current
        const emo = computeEmotion(soul)
        const needs = soul.needs
        const mood = soul.mood
        if (soulAngry()) return { action: null, face: 'annoyed', lines: null }
        if (needs.belonging < 35) {
          return { action: 'look', face: 'sad', lines: ['……你在忙吗。', '陪我一会儿嘛。', '我有点无聊。'] }
        }
        if (mood.valence < -25) return { action: 'sit', face: 'sad', lines: ['……', '有点没精神。'] }
        if (mood.stress > 55) return { action: 'shiver', face: 'worried', lines: ['有点不安…', '你还在吗？'] }
        if (mood.valence > 30) {
          return { action: mood.arousal > 60 ? 'dance' : 'wave', face: emo.token, lines: ['心情不错！', '嘿嘿。', '今天也一起加油吧。'] }
        }
        if (needs.competence < 45) return { action: 'look', face: 'curious', lines: null }
        return { action: null, face: emo.token, lines: null }
      }

      function isClingy() {
        const soul = soulRef.current
        return soul.favor > 80 || (soul.needs.belonging < 34 && soul.relation.trust > 60)
      }

      function seedOcean(key, customText) {
        const base = (PERSONAS[key] && PERSONAS[key].ocean) || { O: 55, C: 55, E: 55, A: 55, N: 50 }
        const adjust = { O: 0, C: 0, E: 0, A: 0, N: 0 }
        const text = String(customText || '')
        if (/温柔|体贴|照顾|耐心/.test(text)) { adjust.A += 8; adjust.N -= 5 }
        if (/毒舌|傲娇|嘴硬/.test(text)) { adjust.A -= 6; adjust.N += 4 }
        if (/活泼|元气|热闹|开朗/.test(text)) { adjust.E += 10 }
        if (/冷淡|安静|话少|高冷/.test(text)) { adjust.E -= 10 }
        if (/病娇|占有|嫉妒|偏执/.test(text)) { adjust.N += 12; adjust.A -= 5 }
        if (/好奇|探索|新鲜/.test(text)) { adjust.O += 8 }
        if (/细心|认真|靠谱/.test(text)) { adjust.C += 8 }
        if (/懒|摸鱼/.test(text)) { adjust.C -= 8 }
        return {
          O: clamp(base.O + adjust.O, 0, 100),
          C: clamp(base.C + adjust.C, 0, 100),
          E: clamp(base.E + adjust.E, 0, 100),
          A: clamp(base.A + adjust.A, 0, 100),
          N: clamp(base.N + adjust.N, 0, 100),
        }
      }

      function choosePersona(key) {
        if (!PERSONAS[key]) return
        commitSoul((s) => ({
          ...s,
          persona: key,
          configured: true,
          ocean: seedOcean(key, s.customPersona),
          lastInteractionAt: Date.now(),
        }))
        setPersonaOpen(false)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(pick(['好，那我就做这样的我。', '嗯……以后请多指教。', '你可别后悔哦。']), 'happy')
          flashEmotion('happy', 2200)
        }, 500)
      }

      /** Free-text personality tuning: kept in the soul and written into her persona prompt. */
      function saveCustomPersona() {
        const text = String(personaText || '').trim().slice(0, 120)
        const guessed = /病娇|占有|锁住/.test(text) ? 'yandere'
          : /傲娇|嘴硬/.test(text) ? 'tsundere'
            : /温柔|体贴|照顾/.test(text) ? 'gentle'
              : /元气|活泼|热闹/.test(text) ? 'genki'
                : /冷|高冷|安静|话少/.test(text) ? 'cool'
                  : (soulRef.current.persona || 'tsundere')
        commitSoul((s) => ({
          ...s,
          customPersona: text,
          persona: s.persona || guessed,
          configured: true,
          ocean: seedOcean(s.persona || guessed, text),
          lastInteractionAt: Date.now(),
        }))
        setPersonaOpen(false)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(text ? '嗯…我记住你希望我是什么样的人了。' : '好，那就按刚才选的来。', 'shy')
          flashEmotion('shy', 2200)
        }, 500)
      }

      function adjustSoulSetting(key, value) {
        commitSoul((s) => ({ ...s, settings: { ...s.settings, [key]: value } }))
      }

      function cancelRiceByUser() {
        const phase = riceRef.current.phase
        if (phase === 'off') return false
        dismissRice(false)
        if (phase === 'chase' || phase === 'notice') {
          adjustFavor(-1.5, '把白饭收走了')
          appraise('riceDismiss', 1)
          startAnger('白饭！！你把我的白饭收走了！', 15000)
        }
        return true
      }

      function chooseTarget() {
        const pos = posRef.current
        const maxX = Math.max(12, window.innerWidth - SIZE - 16)
        const maxY = Math.max(MIN_Y, window.innerHeight - SIZE - 16)
        pos.tx = rand(18, maxX)
        pos.ty = rand(MIN_Y + 30, maxY)
        pos.nextTargetAt = performance.now() + rand(6500, 15000)
      }

      function syncOrientation(pos) {
        const w = window.innerWidth
        const above = pos.y > 190
        const align = pos.x < 156 ? 'left' : (pos.x > w - SIZE - 156 ? 'right' : 'center')
        const current = orientationRef.current
        if (current.above !== above || current.align !== align) {
          orientationRef.current = { above, align }
          setOrientation({ above, align })
        }
      }

      const orientationRef = useRef(orientation)

      // -------------------------------------------------------------------
      // Reactions, speech, toasts
      // -------------------------------------------------------------------

      function flashEmotion(emotion, duration, force) {
        if (!EMOTIONS.has(emotion)) return
        // While a speech bubble is open, its line owns the face; stray event flashes
        // (hover, idle, etc.) must not swap the expression under the words.
        if (!force && stateRef.current.bubble) return
        clearTimeout(reactionTimerRef.current)
        setReaction({ emo: emotion, key: Date.now() })
        reactionTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setReaction(null)
        }, duration || 1800)
      }

      function playAction(nextAction, duration) {
        if (!ACTIONS.has(nextAction) || nextAction === 'none') return
        clearTimeout(actionSwitchTimerRef.current)
        clearTimeout(actionEndTimerRef.current)
        setAction('none')
        actionSwitchTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          setAction(nextAction)
          actionEndTimerRef.current = setTimeout(() => {
            if (mountedRef.current) setAction('none')
          }, duration || 900)
        }, 18)
      }

      function styleSpeech(text, hintEmotion, explicitAction, explicitIntent) {
        const soul = soulRef.current
        const persona = soul.persona || 'tsundere'
        const table = PERSONA_SPEECH[persona] || PERSONA_SPEECH.tsundere
        const inferred = inferSpeechIntent(text)
        const intent = explicitIntent && table[explicitIntent] ? explicitIntent : inferred
        const style = table[intent] || null
        let emotion = hintEmotion && EMOTIONS.has(hintEmotion)
          ? hintEmotion
          : (style ? style[0] : (INTENT_EMOTION[intent] || 'content'))
        const stage = soul.moodStage || 'calm'
        // Mood colors the delivery, but an explicit emotion on the line wins over it.
        if (!hintEmotion) {
          if (stage === 'low' && ['happy', 'excited', 'love', 'proud'].includes(emotion)) emotion = 'content'
          else if (stage === 'angry' && !['angry', 'annoyed', 'sad', 'pout', 'cry', 'shy'].includes(emotion)) emotion = 'pout'
          else if (stage === 'shy' && ['happy', 'excited', 'love', 'proud'].includes(emotion)) emotion = 'shy'
        }
        const action = explicitAction && ACTIONS.has(explicitAction)
          ? explicitAction
          : (style ? style[1] : (EMOTION_ACTION[emotion] || 'look'))
        return { intent, emotion, action }
      }

      function say(text, emotion) {
        if (systemSleepingRef.current) return
        const value = String(text || '').trim()
        if (!value) return
        const options = emotion && typeof emotion === 'object' ? emotion : { emotion: emotion }
        const styled = styleSpeech(value, options.emotion, options.action, options.intent)
        clearTimeout(bubbleTimerRef.current)
        const bubbleMs = clamp(2800 + value.length * 95, 3200, 8200)
        setBubble({ text: value.slice(0, 220), key: Date.now() })
        // Speech owns the face for exactly as long as the bubble is readable. Gestures
        // are NOT fired implicitly: explicit interactions and the action panel request
        // them separately, otherwise every line would throw her into a random motion.
        if (styled.emotion && EMOTIONS.has(styled.emotion)) flashEmotion(styled.emotion, Math.max(3200, bubbleMs), true)
        bubbleTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setBubble(null)
        }, bubbleMs)
      }

      function showToast(text, duration) {
        clearTimeout(toastTimerRef.current)
        setToast({ text: String(text || ''), key: Date.now() })
        toastTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setToast(null)
        }, duration || 3200)
      }

      function pushEvent(text) {
        if (!text) return
        eventLogRef.current = [...eventLogRef.current, String(text).slice(0, 60)].slice(-6)
      }

      function addBond(happiness, affinity) {
        setStats((prev) => ({
          ...prev,
          happiness: clamp(prev.happiness + (happiness || 0), 0, 100),
          affinity: clamp(prev.affinity + (affinity || 0), 0, 100),
        }))
      }

      function greetFor(statsValue, elapsedHours) {
        if (elapsedHours > 3) return chooseLine(LINES.late)
        const persona = PERSONAS[soulRef.current.persona]
        if (persona && persona.idle && Math.random() < .4) return pick(persona.idle)
        const time = timeOfDay()
        const list = time === 'morning' ? LINES.greetMorning
          : time === 'noon' ? LINES.greetNoon
            : time === 'afternoon' ? LINES.greetAfternoon
              : time === 'evening' ? LINES.greetEvening : LINES.greetNight
        let line = chooseLine(list)
        if (statsValue.hunger < 35) line += ' 我肚皮有点扁了，你听见它在敲鼓吗？'
        else if (statsValue.energy < 35) line += ' 我好像还没完全醒过来…'
        return line
      }

      // -------------------------------------------------------------------
      // Care actions
      // -------------------------------------------------------------------

      function petTheFish() {
        const now = Date.now()
        lastInteractionRef.current = now
        if (soulRef.current.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1400)
          return
        }
        const rice = riceRef.current
        if (rice.phase === 'angry') {
          // she is sulking: no petting, no attention
          say(pick(['哼，不理你。', '走开啦！', '……（把头扭到一边）']), 'annoyed')
          flashEmotion('annoyed', 1600)
          return
        }
        if (rice.phase === 'chase' && now < rice.cryUntil) {
          // comforting her after a hard fall speeds the recovery up
          rice.cryUntil = now + 300
          say(pick(['呜呜……抱抱……', '吹吹就不痛了……', '你、你终于来哄我了……']), 'cry')
          flashEmotion('shy', 1800)
          return
        }
        if (rice.phase === 'chase') {
          say(pick(['等、等一下！白饭要跑了！', '别闹！我还没吃到！', '先让我抓到白饭嘛！']), 'flustered')
          flashEmotion('flustered', 1200)
          return
        }
        pushEvent('被摸了一下')
        facePlayer()
        appraise('pet', 0.7)
        const soul = soulRef.current
        if (soul.favor < 50 && Math.random() < .28) {
          say(pick(['……嗯。', '别闹。', '我现在不想说话。']), 'pout')
          flashEmotion('pout', 1200)
          return
        }
        if (sleepingRef.current) {
          wakeUp(true)
          return
        }
        const clicks = clickTimesRef.current.filter((time) => now - time < 2600)
        clicks.push(now)
        clickTimesRef.current = clicks
        const state = stateRef.current
        if (state.stats.hunger < 18 && Math.random() < 0.5) {
          say(chooseLine(LINES.pet), 'hungry')
        } else if (clicks.length >= 4) {
          say(chooseLine(LINES.petHard), 'annoyed')
          runAction('angry')
          flashEmotion('annoyed', 1600)
        } else {
          const petFaces = clicks.length >= 3
            ? ['pout', 'wink', 'shy', 'happy']
            : ['happy', 'love', 'shy', 'wink', 'excited']
          say(chooseLine(LINES.pet), pick(petFaces))
          playAction(pick(['heart', 'shy', 'wave', 'dance']), 800)
          addBond(1.4, 0.7)
        }
        setStats((prev) => ({ ...prev, happiness: clamp(prev.happiness + 0.8, 0, 100) }))
        adjustFavor(0.5)
        adjustTrait('closeness', 1)
        touchSoul()
      }

      function feedFish() {
        lastInteractionRef.current = Date.now()
        if (soulRef.current.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1400)
          return
        }
        const rice = riceRef.current
        if (rice.phase === 'angry') {
          say(pick(['不要！哼！', '才不吃你的白饭！', '走开啦！']), 'angry')
          flashEmotion('annoyed', 1800)
          return
        }
        if (rice.phase !== 'off') { dismissRice(true); return }
        const state = stateRef.current
        const veryFull = state.stats.hunger > 92
        pushEvent('召唤了一碗白饭')
        if (sleepingRef.current) wakeUp(false)
        if (chatOpenRef.current) closeChat()
        setActionPanelOpen(false)
        setMenuOpen(false)
        const point = currentBowlPoint()
        rice.phase = 'notice'
        rice.noticeAt = performance.now()
        rice.chaseAt = 0; rice.jumpAt = 0; rice.tumbleUntil = 0; rice.cryUntil = 0; rice.ignoreUntil = 0
        rice.walkId = ''; rice.walkTarget = 0; rice.heavy = false; rice.lastDir = 0; rice.lastSayAt = 0
        rice.veryFull = veryFull
        rice.lastBowlX = point.x; rice.lastBowlY = point.y
        setRiceKey((value) => value + 1)
        setRiceOn(true)
        facePlayer()
        flashEmotion(veryFull ? 'flustered' : 'excited', 2400)
        say(veryFull
          ? pick(['肚皮已经圆滚滚啦……不过、不过再吃一点点也行！', '其实不太饿……可这个白饭看起来好香……'])
          : pick(['白饭！！（眼睛冒星星）', '啊！是白饭！等等我——', '我的我的我的！']), veryFull ? 'flustered' : 'excited')
        adjustFavor(0.4)
        appraise('feed', 0.6)
        touchSoul()
        setTimeout(() => {
          if (!mountedRef.current) return
          try { liveRef.current?.do?.('hop') } catch (error) { /* ignore */ }
        }, 180)
      }

      function playWithFish() {
        lastInteractionRef.current = Date.now()
        const rice = riceRef.current
        if (rice.phase === 'chase' || rice.phase === 'angry') {
          say(pick(['白饭先给我！', '现在没空玩尾巴！']), 'pout')
          return
        }
        pushEvent('追着自己的鲸尾玩')
        if (sleepingRef.current) wakeUp(false)
        facePlayer()
        const state = stateRef.current
        if (state.stats.energy < 15) {
          say(chooseLine(LINES.playTired), 'sleepy')
          playAction('nod', 800)
          return
        }
        setStats((prev) => ({
          ...prev,
          happiness: clamp(prev.happiness + 16, 0, 100),
          energy: clamp(prev.energy - 9, 0, 100),
          hunger: clamp(prev.hunger - 3, 0, 100),
          affinity: clamp(prev.affinity + 2, 0, 100),
        }))
        say(chooseLine(LINES.play), pick(['love', 'excited', 'happy']))
        playAction(pick(['heart', 'dance', 'shy']), 950)
        adjustFavor(1, '陪她玩了一会儿')
        appraise('play', 0.8)
        adjustTrait('closeness', 2)
        touchSoul()
      }

      function goSleep() {
        if (sleepingRef.current) {
          wakeUp(true)
          return
        }
        if (riceRef.current.phase !== 'off') dismissRice(false)
        lastInteractionRef.current = Date.now()
        pushEvent('睡着了一会儿')
        setSleeping(true)
        setBubble(null)
        playAction('nod', 700)
        say(chooseLine(LINES.sleep), 'sleepy')
        clearInterval(sleepIntervalRef.current)
        clearTimeout(sleepTimeoutRef.current)
        sleepIntervalRef.current = setInterval(() => {
          setStats((prev) => ({
            ...prev,
            energy: clamp(prev.energy + 2.4, 0, 100),
            hunger: clamp(prev.hunger - 0.2, 0, 100),
          }))
        }, 1000)
        sleepTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) stopSleeping(true)
        }, 19000)
      }

      function wakeUp(spoken) {
        if (!sleepingRef.current) return
        stopSleeping(false)
        if (spoken) {
          say(chooseLine(LINES.wake), 'sleepy')
          playAction('nod', 700)
        }
      }

      function stopSleeping(spoken) {
        clearInterval(sleepIntervalRef.current)
        clearTimeout(sleepTimeoutRef.current)
        setSleeping(false)
        if (spoken) {
          say('唔…我睡了多久？感觉肚皮都变轻了。', 'sleepy')
        }
      }

      // -------------------------------------------------------------------
      // Chat
      // -------------------------------------------------------------------

      async function checkAi(force) {
        if (!force && Date.now() - aiCheckedAtRef.current < 60000) return aiStateRef.current
        aiCheckedAtRef.current = Date.now()
        try {
          const response = await fetch('/fatfish-pet/health', {
            method: 'GET',
            headers: { accept: 'application/json' },
            credentials: 'same-origin',
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const payload = await response.json()
          const next = { ai: Boolean(payload && payload.ai), model: payload.model || null, checked: true }
          aiStateRef.current = next
          if (mountedRef.current) setAiInfo(next)
          return next
        } catch (error) {
          const next = { ai: false, model: null, checked: true }
          aiStateRef.current = next
          if (mountedRef.current) setAiInfo(next)
          return next
        }
      }

      function openChat() {
        lastInteractionRef.current = Date.now()
        if (riceRef.current.phase !== 'off') dismissRice(false)
        pushEvent('被叫去聊天')
        setVisible(true)
        setChatOpen(true)
        setMenuOpen(false)
        setSettingsOpen(false)
        setActionPanelOpen(false)
        if (sleepingRef.current) wakeUp(false)
        setMessages((prev) => {
          if (prev.length > 0) return prev
          const state = stateRef.current
          return [{
            id: uid(),
            role: 'pet',
            text: greetFor(state.stats, 0),
            ts: Date.now(),
          }]
        })
        if (!aiStateRef.current.checked || Date.now() - aiCheckedAtRef.current > 60000) {
          checkAi(true)
        }
      }

      function closeChat() {
        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
          chatAbortRef.current = null
        }
        setTyping(false)
        typingRef.current = false
        setMessages((prev) => prev.filter((message) => !message.streaming))
        setChatOpen(false)
        setSettingsOpen(false)
        setInput('')
        if (recognitionRef.current) {
          try { recognitionRef.current.stop() } catch (error) { /* ignore */ }
          recognitionRef.current = null
        }
        setListening(false)
        if (typeof window.speechSynthesis !== 'undefined') {
          try { window.speechSynthesis.cancel() } catch (error) { /* ignore */ }
        }
      }

      function buildPetPayload() {
        const state = stateRef.current
        return {
          name: state.name,
          userName: state.userName,
          emotion: effectiveEmotion,
          hunger: roundStat(state.stats.hunger),
          energy: roundStat(state.stats.energy),
          happiness: roundStat(state.stats.happiness),
          affinity: roundStat(state.stats.affinity),
          time: new Date().toISOString(),
          events: eventLogRef.current.slice(-5),
          soul: {
            favor: Math.round(soulRef.current.favor),
            personaName: PERSONAS[soulRef.current.persona] ? PERSONAS[soulRef.current.persona].label : '',
            custom: soulRef.current.customPersona || '',
            warped: !!soulRef.current.warped,
            angry: soulAngry(),
            ocean: soulRef.current.ocean,
            mood: {
              valence: Math.round(soulRef.current.mood.valence),
              stress: Math.round(soulRef.current.mood.stress),
            },
            needs: {
              belonging: Math.round(soulRef.current.needs.belonging),
              competence: Math.round(soulRef.current.needs.competence),
            },
            relation: {
              trust: Math.round(soulRef.current.relation.trust),
              resentment: Math.round(soulRef.current.relation.resentment),
            },
            emotion: soulRef.current.emotion,
            selfNarrative: soulRef.current.selfNarrative || '',
            beliefs: (soulRef.current.beliefs || []).slice(-3),
          },
        }
      }

      function addStatsAfterChat() {
        setStats((prev) => ({
          ...prev,
          affinity: clamp(prev.affinity + 1.1, 0, 100),
          happiness: clamp(prev.happiness + 1.6, 0, 100),
          hunger: clamp(prev.hunger - 0.3, 0, 100),
        }))
        lastInteractionRef.current = Date.now()
      }

      function speak(text) {
        if (!voiceOnRef.current || typeof window.speechSynthesis === 'undefined') return
        const value = String(text || '')
          .replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '')
          .replace(/[*_#>`]/g, '')
          .trim()
          .slice(0, 200)
        if (!value) return
        try {
          window.speechSynthesis.cancel()
          const utterance = new SpeechSynthesisUtterance(value)
          utterance.lang = 'zh-CN'
          utterance.rate = 1.06
          utterance.pitch = 1.32
          const voices = typeof window.speechSynthesis.getVoices === 'function'
            ? window.speechSynthesis.getVoices()
            : []
          const chinese = voices.find((voice) => /^zh/i.test(voice.lang || ''))
            || voices.find((voice) => /chinese|中文|普通话/i.test(voice.name || ''))
          if (chinese) utterance.voice = chinese
          window.speechSynthesis.speak(utterance)
          try { liveRef.current?.talk?.() } catch (error) { /* ignore */ }
        } catch (error) { /* speech may be unsupported or blocked */ }
      }

      function startListening() {
        if (!asrSupported || listening) return
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!Recognition) return
        let recognition
        try {
          recognition = new Recognition()
        } catch (error) {
          showToast(t('ui.micError'), 2400)
          return
        }
        let finalText = ''
        recognition.lang = 'zh-CN'
        recognition.interimResults = true
        recognition.continuous = false
        recognition.onresult = (event) => {
          let interim = ''
          for (let index = event.resultIndex; index < event.results.length; index += 1) {
            const result = event.results[index]
            const transcript = result[0] ? result[0].transcript : ''
            if (result.isFinal) finalText += transcript
            else interim += transcript
          }
          setInput((finalText || interim).slice(0, 300))
        }
        recognition.onerror = (event) => {
          const code = event && event.error ? event.error : ''
          if (code !== 'aborted' && code !== 'no-speech') showToast(t('ui.micError'), 2400)
          setListening(false)
          recognitionRef.current = null
        }
        recognition.onend = () => {
          setListening(false)
          recognitionRef.current = null
          const value = finalText.trim()
          if (value) submitMessage(value)
        }
        try {
          recognition.start()
          recognitionRef.current = recognition
          setListening(true)
        } catch (error) {
          showToast(t('ui.micError'), 2400)
        }
      }

      function stopListening() {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop() } catch (error) { /* ignore */ }
        }
      }

      function localReplyFor(text) {
        setTimeout(() => {
          if (!mountedRef.current) return
          const state = stateRef.current
          const reply = buildLocalReply(text, {
            stats: state.stats,
            userName: state.userName,
            setName,
            setUserName,
          })
          setTyping(false)
          typingRef.current = false
          setMessages((prev) => [...prev, {
            id: uid(),
            role: 'pet',
            text: reply.text,
            ts: Date.now(),
          }].slice(-40))
          flashEmotion(reply.emo, 3000)
          if (reply.act) playAction(reply.act, 900)
          addStatsAfterChat()
          speak(reply.text)
        }, 520 + Math.random() * 620)
      }

      async function submitMessage(rawText, options = {}) {
        const text = String(rawText || '').trim().slice(0, 400)
        if (!text || typingRef.current) return
        const agentCommand = text.match(/^\/(agent|帮)\s+([\s\S]+)$/i)
        const autoAgent = !agentCommand && soulRef.current.settings.agent && !options.hiddenUser
          && /^(帮我|帮忙|请帮我|你帮我|能不能帮我|告诉我|查一下|查查|查询|搜索|搜一下|上网|计算|统计|看看|看一下|列出|总结一下|执行|跑一下|读一下|写一下)/.test(text)
          && !/(摸摸|抱抱|亲亲|贴贴|喜欢你|爱我)/.test(text)
        if ((agentCommand || autoAgent) && soulRef.current.settings.agent && !options.hiddenUser) {
          const goal = agentCommand ? agentCommand[2].trim().slice(0, 400) : text
          if (runPetAgent(goal, { trigger: agentCommand ? 'chat_agent' : 'chat_auto_agent', openChat: true })) {
            setInput('')
            lastInteractionRef.current = Date.now()
            setMessages((prev) => [...prev, {
              id: uid(),
              role: 'user',
              text: agentCommand ? `（让她帮忙）${goal}` : text,
              ts: Date.now(),
            }].slice(-40))
            pushEvent('让她帮忙')
            return
          }
          showToast('Agent 暂时不可用，先按聊天回复你。', 2200)
        }
        typingRef.current = true
        setInput('')
        setTyping(true)
        if (!options.hiddenUser) {
          setMessages((prev) => [...prev, {
            id: uid(),
            role: 'user',
            text,
            ts: Date.now(),
          }].slice(-40))
        }
        lastInteractionRef.current = Date.now()
        pushEvent(options.hiddenUser ? '主动帮忙' : '说了一句话')

        let ai = aiStateRef.current
        if (!ai.checked || (!ai.ai && Date.now() - aiCheckedAtRef.current > 60000)) {
          ai = await checkAi(true)
        }
        if (!ai.ai) {
          localReplyFor(text)
          return
        }

        const state = stateRef.current
        const history = state.messages.slice(-10).map((message) => ({
          role: message.role === 'user' ? 'user' : 'pet',
          text: String(message.text || '').slice(0, 300),
        })).filter((message) => message.text)

        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
        }
        const controller = new AbortController()
        chatAbortRef.current = controller
        const assistantId = uid()
        let placeholderAdded = false
        let lastFlush = 0
        let streamedText = ''
        let controlDone = false
        let controlEmotion = ''
        let controlAction = ''
        let rawAccumulator = ''
        let gotMeta = false

        const addPlaceholder = () => {
          if (placeholderAdded) return
          placeholderAdded = true
          setMessages((prev) => [...prev, {
            id: assistantId,
            role: 'pet',
            text: '',
            ts: Date.now(),
            streaming: true,
          }].slice(-40))
        }

        const flush = (force) => {
          const now = performance.now()
          if (!force && now - lastFlush < 42) return
          lastFlush = now
          setMessages((prev) => prev.map((message) => (
            message.id === assistantId ? { ...message, text: streamedText } : message
          )))
        }

        const parseControl = (candidate) => {
          const emoMatch = candidate.match(/\[emo\s*:\s*([a-z]+)\s*\]/i)
          const actMatch = candidate.match(/\[act\s*:\s*([a-z]+)\s*\]/i)
          if (emoMatch) controlEmotion = emoMatch[1].toLowerCase()
          if (actMatch) controlAction = actMatch[1].toLowerCase()
          return candidate.replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '').trim()
        }

        const consumeVisible = (rawRemainder) => {
          const cleaned = parseControl(rawRemainder)
          streamedText = cleaned.slice(0, 420)
          flush(true)
        }

        try {
          addPlaceholder()
          const response = await fetch('/fatfish-pet/chat', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
            credentials: 'same-origin',
            signal: controller.signal,
            body: JSON.stringify({
              message: text,
              history,
              pet: buildPetPayload(),
            }),
          })
          if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`)

          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          let buffer = ''

          const handleEvent = (event) => {
            if (!event || typeof event !== 'object') return
            if (event.type === 'meta') {
              gotMeta = true
              const next = { ai: true, model: event.model || aiStateRef.current.model, checked: true }
              aiStateRef.current = next
              if (mountedRef.current) setAiInfo(next)
              return
            }
            if (event.type === 'delta' && typeof event.text === 'string') {
              const chunk = event.text
              if (!controlDone) {
                rawAccumulator += chunk
                const newline = rawAccumulator.indexOf('\n')
                if (newline >= 0) {
                  controlDone = true
                  const controlLine = rawAccumulator.slice(0, newline)
                  parseControl(controlLine)
                  consumeVisible(rawAccumulator.slice(newline + 1))
                } else if (rawAccumulator.length > 96) {
                  controlDone = true
                  parseControl(rawAccumulator)
                  consumeVisible(rawAccumulator)
                }
              } else {
                streamedText = (streamedText + chunk.replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '')).slice(0, 420)
                flush(false)
              }
              return
            }
            if (event.type === 'error') {
              throw new Error(event.code || event.message || 'AI_ERROR')
            }
            if (event.type === 'done') {
              if (!gotMeta) {
                const next = { ai: true, model: aiStateRef.current.model, checked: true }
                aiStateRef.current = next
                if (mountedRef.current) setAiInfo(next)
              }
            }
          }

          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            let boundary = buffer.indexOf('\n\n')
            while (boundary >= 0) {
              const frame = buffer.slice(0, boundary)
              buffer = buffer.slice(boundary + 2)
              for (const line of frame.split('\n')) {
                const trimmed = line.trim()
                if (!trimmed.startsWith('data:')) continue
                const data = trimmed.slice(5).trim()
                if (!data) continue
                let event
                try {
                  event = JSON.parse(data)
                } catch (parseError) {
                  continue
                }
                handleEvent(event)
              }
              boundary = buffer.indexOf('\n\n')
            }
          }

          if (!controlDone) {
            controlDone = true
            parseControl(rawAccumulator)
            consumeVisible(rawAccumulator)
          }
          streamedText = streamedText.trim()
          if (!streamedText) throw new Error('EMPTY_REPLY')

          setMessages((prev) => prev.map((message) => (
            message.id === assistantId
              ? { ...message, text: streamedText, streaming: false }
              : message
          )))
          if (controlEmotion && EMOTIONS.has(controlEmotion)) {
            flashEmotion(controlEmotion, 3200)
          } else {
            flashEmotion(inferEmotion(streamedText), 2600)
          }
          if (controlAction && ACTIONS.has(controlAction) && controlAction !== 'none') {
            playAction(controlAction, 950)
          }
          setTyping(false)
          typingRef.current = false
          addStatsAfterChat()
          adjustFavor(0.6)
          appraise('chatGood', 0.5)
          adjustTrait('closeness', 1)
          touchSoul()
          speak(streamedText)
          chatAbortRef.current = null
          if (!gotMeta) {
            const next = { ai: true, model: aiStateRef.current.model, checked: true }
            aiStateRef.current = next
            if (mountedRef.current) setAiInfo(next)
          }
        } catch (error) {
          if (error && (error.name === 'AbortError' || controller.signal.aborted)) {
            if (mountedRef.current) {
              setTyping(false)
              typingRef.current = false
              setMessages((prev) => prev.filter((message) => message.id !== assistantId))
            }
            return
          }
          if (mountedRef.current) {
            if (placeholderAdded) {
              setMessages((prev) => prev.filter((message) => message.id !== assistantId))
            }
            const next = { ai: false, model: aiStateRef.current.model, checked: true }
            aiStateRef.current = next
            setAiInfo(next)
            showToast(t('ui.aiFallback'), 2800)
            localReplyFor(text)
          }
        }
      }

      // -------------------------------------------------------------------
      // Menu + settings
      // -------------------------------------------------------------------

      function openMenu(event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
        facePlayer()
        const pos = posRef.current
        const width = 220
        const height = 560
        const x = clamp(pos.x + SIZE - 36, 8, Math.max(8, window.innerWidth - width - 8))
        const y = clamp(pos.y + 8, 8, Math.max(8, window.innerHeight - height - 8))
        setMenuPos({ x, y })
        setMenuOpen(true)
        setSettingsOpen(false)
        setActionPanelOpen(false)
      }

      function closeMenu() {
        setMenuOpen(false)
        const pos = posRef.current
        pos.nextTargetAt = performance.now() + 1800
      }

      function openSettings() {
        setNameDraft(name)
        setUserNameDraft(userName)
        setWanderDraft(wander)
        setQuietDraft(quiet)
        setVoiceDraft(voiceOn)
        setSettingsOpen(true)
        setMenuOpen(false)
      }

      function saveSettings() {
        const nextName = String(nameDraft || '').trim().slice(0, 10) || t('name.petDefault')
        const nextUser = String(userNameDraft || '').trim().slice(0, 10) || t('name.userDefault')
        setName(nextName)
        setUserName(nextUser)
        setWander(wanderDraft)
        setQuiet(quietDraft)
        setVoiceOn(voiceDraft)
        setSettingsOpen(false)
        addBond(2, 0.6)
        showToast(t('ui.save'), 1600)
      }

      function hidePet() {
        if (riceRef.current.phase !== 'off') dismissRice(false)
        setVisible(false)
        setChatOpen(false)
        setMenuOpen(false)
        setSettingsOpen(false)
        setActionPanelOpen(false)
        showToast(t('ui.hiddenHint'), 3600)
        saveState()
      }

      // -------------------------------------------------------------------
      // Movement loop
      // -------------------------------------------------------------------

      useEffect(() => {
        if (!visible) return undefined
        let raf = 0
        let last = performance.now()
        const loop = (time) => {
          frameRef.current += 1
          lastFrameRef.current = time
          const dt = Math.min(48, Math.max(8, time - last))
          last = time
          const pos = posRef.current
          const width = window.innerWidth
          const height = window.innerHeight
          const maxX = Math.max(8, width - SIZE - 8)
          const maxY = Math.max(MIN_Y, height - SIZE - 8)
          const roam = roamRef.current
          const live = liveRef.current
          const liveFloor = height - LIVE_FLOOR_PAD
          const fallbackFloor = Math.max(MIN_Y, height - SIZE - 10)

          // The kit body simulates its own legs; advance it first, then read where it is.
          if (live) {
            const cursor = cursorRef.current
            const point = cursor.active
              ? { x: cursor.x, y: cursor.y }
              : { x: width / 2, y: liveFloor - 80 }
            try { live.pointer('move', point) } catch (error) { /* ignore */ }
            try { live.step(dt / 1000) } catch (error) { /* ignore */ }
          }
          const layout = liveLayout()

          // If a pointerup went missing (window switch / focus loss mid-drag) the kit
          // can be left holding her: let go so she drops back onto the floor.
          if (live && layout && layout.mode === 'drag' && !dragRef.current.active) {
            const nowMs = performance.now()
            if (nowMs - (dragRef.current.lastReleaseAt || 0) > 400) {
              dragRef.current.lastReleaseAt = nowMs
              try { live.pointer('up', { x: clamp(layout.x, 0, width), y: height - LIVE_FLOOR_PAD }) } catch (error) { /* ignore */ }
            }
          }

          if (dragRef.current.active) {
            // The kit owns the drag: it follows the pointer and is thrown on release.
            pos.x = clamp(pos.x, 6, maxX)
            pos.y = clamp(pos.y, MIN_Y, maxY)
            roam.mode = 'idle'
            roam.state = 'idle'
            roam.until = time + 900
          } else if (live && layout) {
            // ---- Live2D locomotion ----
            // The kit body decides for itself: its walk/run choices carry her with
            // real step cadence, dashes, skids and pauses. We only switch that
            // autonomy off when the UI needs her to stand still or go somewhere.
            const kitBusy = layout.mode === 'drag' || layout.mode === 'air' || layout.mode === 'crouch' || layout.mode === 'land'
            const minC = LIVE_INSET
            const maxC = Math.max(minC, width - LIVE_INSET)
            const riceActive = riceRef.current.phase !== 'off'
            const wantRoam = !chatOpenRef.current && !menuOpenRef.current && !sleepingRef.current && wanderRef.current && !riceActive
            setKitRoam(wantRoam)
            roam.mode = layout.mode
            roam.bodyWalking = layout.mode === 'walk' || layout.mode === 'run'
            roam.target = layout.x

            // A dash that just ended: sometimes she finishes with a somersault.
            if (wantRoam && !riceActive && roam.lastKitMode === 'run' && layout.mode !== 'run' && !kitBusy && Math.random() < 0.2) {
              setTimeout(() => { if (mountedRef.current) liveFlip() }, 220)
            }
            roam.lastKitMode = layout.mode

            // Clingy band: at high favor she hovers near the cursor instead of wandering.
            if (wantRoam && isClingy() && !kitBusy && riceRef.current.phase === 'off') {
              const cursor = cursorRef.current
              if (cursor.active && layout.mode === 'idle' && time > (roam.clingyAt || 0)) {
                const targetX = clamp(cursor.x - 90, minC, maxC)
                if (Math.abs(layout.x - targetX) > 90) {
                  roam.walkId = `cling-${Math.round(time)}`
                  liveWalk(targetX, false, roam.walkId)
                  roam.clingyAt = time + rand(4000, 8000)
                } else {
                  roam.clingyAt = time + rand(5000, 9000)
                }
              }
            }

            if (riceActive) {
              tickRice(live, layout, time)
            } else if (chatOpenRef.current) {
              const rect = panelRectRef.current
              const targetC = clamp(rect && rect.width > 0 ? rect.left - SIZE * 0.44 : width - SIZE - 200, minC, maxC)
              roam.chatTarget = targetC
              if (!kitBusy && layout.mode !== 'walk' && layout.mode !== 'run' && Math.abs(layout.x - targetC) > 5) {
                roam.walkId = `chat-${Math.round(time)}`
                liveWalk(targetC, Math.abs(layout.x - targetC) > 360, roam.walkId)
              } else if ((layout.mode === 'walk' || layout.mode === 'run') && Math.abs(layout.x - targetC) < 4) {
                liveStop()
              }
              roam.until = time + 1200
            } else if (!wantRoam) {
              if (!sleepingRef.current && (layout.mode === 'walk' || layout.mode === 'run')) liveStop()
              roam.state = 'idle'
              roam.until = time + 1400
            }
          } else {
            // ---- sprite fallback: the old DOM walk (used only when WebGL/rig fails) ----
            pos.y += (fallbackFloor - pos.y) * Math.min(1, dt / 240)
            if (Math.abs(pos.y - fallbackFloor) < 0.4) pos.y = fallbackFloor

            if (chatOpenRef.current) {
              const rect = panelRectRef.current
              let targetX
              if (rect && rect.width > 0 && rect.left > SIZE + 46) {
                targetX = clamp(rect.left - SIZE - 18, 10, maxX)
              } else if (rect && rect.width > 0) {
                targetX = clamp(rect.left + 8, 10, maxX)
              } else {
                targetX = clamp(width - SIZE - 400, 10, maxX)
              }
              const diff = targetX - pos.x
              if (Math.abs(diff) > 1.5) {
                pos.x += Math.sign(diff) * Math.min(Math.abs(diff), 56 * dt / 1000)
                roam.mode = 'walk'
              } else {
                pos.x = targetX
                roam.mode = 'idle'
              }
              roam.until = time + 900
            } else if (menuOpenRef.current || sleepingRef.current || !wanderRef.current) {
              roam.mode = 'idle'
              roam.until = time + 900
            } else if (roam.mode === 'idle') {
              if (time >= roam.until) {
                const nearLeft = pos.x < 24
                const nearRight = pos.x > maxX - 24
                roam.dir = nearLeft ? 1 : nearRight ? -1 : (Math.random() < 0.5 ? -1 : 1)
                roam.speed = rand(24, 44)
                roam.mode = 'walk'
                roam.until = time + rand(2600, 7200)
              }
            } else if (roam.mode === 'walk') {
              pos.x += roam.dir * roam.speed * dt / 1000
              if (pos.x <= 10) { pos.x = 10; roam.dir = 1 }
              else if (pos.x >= maxX) { pos.x = maxX; roam.dir = -1 }
              if (time >= roam.until) { roam.mode = 'idle'; roam.until = time + rand(1500, 4300) }
            }
            pos.x = clamp(pos.x, 10, maxX)
            pos.y = fallbackFloor
          }

          if (live && layout) {
            // Glue the interactive overlay, bubble and menu to the kit body.
            pos.x = layout.x - SIZE / 2
            pos.y = height - SIZE - 6
            pos.tx = pos.x
            pos.ty = pos.y
            roam.mode = layout.mode
            roam.bodyWalking = layout.mode === 'walk' || layout.mode === 'run'
          } else {
            pos.tx = pos.x
            pos.ty = pos.y
          }

          const stage = stageRef.current
          if (stage) {
            stage.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`
            const walkingNow = !live && roam.mode === 'walk'
            const tilt = walkingNow ? (roam.dir || 1) * 1.1 : 0
            stage.style.setProperty('--ffish-tilt', `${tilt.toFixed(2)}deg`)
            stage.classList.toggle('ffish--walking', walkingNow)
          }

          if (bowlRef.current) {
            const rice = riceRef.current
            const cursor = cursorRef.current
            const bx = clamp(cursor.active ? cursor.x : rice.lastBowlX, 26, window.innerWidth - 26)
            const by = clamp(cursor.active ? cursor.y : rice.lastBowlY, 70, window.innerHeight - 16)
            rice.lastBowlX = bx
            rice.lastBowlY = by
            bowlRef.current.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0)`
          }

          const fish = fishRef.current
          if (fish) {
            const cursor = cursorRef.current
            if (cursor.active) {
              const centerX = pos.x + SIZE / 2
              const centerY = pos.y + SIZE / 2
              const dx = cursor.x - centerX
              const dy = cursor.y - centerY
              const distance = Math.hypot(dx, dy) || 1
              const pull = Math.min(1, 110 / distance)
              const lookX = clamp((dx / distance) * 2.7 * pull, -2.7, 2.7)
              const lookY = clamp((dy / distance) * 2.3 * pull, -2.3, 2.3)
              fish.style.setProperty('--ffish-look-x', `${lookX.toFixed(2)}px`)
              fish.style.setProperty('--ffish-look-y', `${lookY.toFixed(2)}px`)
            } else {
              fish.style.setProperty('--ffish-look-x', '0px')
              fish.style.setProperty('--ffish-look-y', '0px')
            }
          }

          syncOrientation(pos)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
      }, [visible])

      // -------------------------------------------------------------------
      // Global listeners
      // -------------------------------------------------------------------

      useEffect(() => {
        const onPointerMove = (event) => {
          cursorRef.current = { x: event.clientX, y: event.clientY, active: true }
        }
        const onPointerLeave = () => {
          cursorRef.current = { x: -1000, y: -1000, active: false }
        }
        const onBlur = () => {
          onPointerLeave()
          const drag = dragRef.current
          if (!drag.active) return
          drag.active = false
          setDragging(false)
          const live = liveRef.current
          if (live && drag.kitGrabbed) {
            try {
              live.pointer('up', {
                x: clamp(posRef.current.x + SIZE / 2, 0, window.innerWidth),
                y: window.innerHeight - LIVE_FLOOR_PAD,
              })
            } catch (error) { /* ignore */ }
          }
        }
        const onResize = () => {
          clampPosition()
          applyTransform()
          resizeLiveStage()
          if (chatRef.current) panelRectRef.current = chatRef.current.getBoundingClientRect()
        }
        // Wheel over the pet zooms the figure; the page itself does not scroll.
        const onWheel = (event) => {
          if (!stageRef.current || !stageRef.current.contains(event.target)) return
          event.preventDefault()
          applyZoom(zoomRef.current + (event.deltaY < 0 ? 0.08 : -0.08))
        }
        const onKeyDown = (event) => {
          const target = event.target
          const insidePet = target && typeof target.closest === 'function' && target.closest('.ffish-pet-root')
          if (!insidePet) {
            userWorkRef.current.keys += 1
            userWorkRef.current.lastKeyAt = Date.now()
          }
          if (event.altKey && event.shiftKey && event.code === 'KeyF') {
            event.preventDefault()
            if (soulRef.current.gone) {
              showToast('……（她不在，喊也没用。）', 2600)
              return
            }
            const nextVisible = !visibleRef.current
            if (!nextVisible) {
              setChatOpen(false)
              setMenuOpen(false)
              setSettingsOpen(false)
            }
            setVisible(nextVisible)
          } else if (event.altKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault()
            if (chatOpenRef.current) closeChat()
            else openChat()
          } else if (event.key === 'Escape') {
            if (menuOpenRef.current) closeMenu()
            else if (actionPanelOpen) setActionPanelOpen(false)
            else if (settingsOpen) setSettingsOpen(false)
            else if (chatOpenRef.current) closeChat()
            else if (riceRef.current.phase !== 'off') dismissRice(true)
          }
        }
        // Right-click while the rice game is running takes the bowl away (and she
        // will be cross about it). Otherwise right-click opens her usual menu.
        const onContextMenuCapture = (event) => {
          if (riceRef.current.phase === 'off') return
          event.preventDefault()
          event.stopPropagation()
          cancelRiceByUser()
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('contextmenu', onContextMenuCapture, true)
        window.addEventListener('blur', onBlur)
        window.addEventListener('resize', onResize)
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('pointerleave', onPointerLeave)
        return () => {
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('contextmenu', onContextMenuCapture, true)
          window.removeEventListener('blur', onBlur)
          window.removeEventListener('resize', onResize)
          window.removeEventListener('keydown', onKeyDown)
          window.removeEventListener('wheel', onWheel)
          document.removeEventListener('pointerleave', onPointerLeave)
        }
      }, [settingsOpen, actionPanelOpen])

      // The soul ticks on its own: coldness, sulking, wandering off, help offers.
      useEffect(() => {
        const timer = setInterval(() => {
          if (mountedRef.current) tickSoul()
        }, 30000)
        const first = setTimeout(() => { if (mountedRef.current) tickSoul() }, 4500)
        return () => { clearInterval(timer); clearTimeout(first) }
      }, [])

      // Recovery from a mood-driven fall: she gets up on her own and either smiles
      // again or keeps sniffling, depending on whether her mood actually improved.
      useEffect(() => {
        const timer = setInterval(() => {
          const soul = soulRef.current
          if (!soul.fallingUntil || Date.now() <= soul.fallingUntil) return
          commitSoul((s) => ({ ...s, fallingUntil: 0, fallHeavy: false }))
          try { liveRef.current?.do?.('stand') } catch (error) { /* ignore */ }
          if (soul.mood.valence > -8) {
            say('……好了，我没事了！', 'happy')
            flashEmotion('happy', 3800)
          } else {
            say('……还有点疼。', 'sad')
            flashEmotion('sad', 3800)
          }
          refreshMoodStage(true)
        }, 2500)
        return () => clearInterval(timer)
      }, [])

      // While she is angry: her face cycles through the mood phases and she huffs.
      useEffect(() => {
        if (!angry) return undefined
        let phase = 0
        const faceCycle = ['annoyed', 'pout', 'angry', 'sad']
        const faceTimer = setInterval(() => {
          if (!mountedRef.current) return
          phase = (phase + 1) % faceCycle.length
          flashEmotion(faceCycle[phase], 2600)
        }, 3200)
        const beepTimer = setInterval(() => { beepAngry() }, 15000)
        const endTimer = setInterval(() => { if (!soulAngry()) endAnger() }, 3000)
        return () => {
          clearInterval(faceTimer)
          clearInterval(beepTimer)
          clearInterval(endTimer)
        }
      }, [angry])

      // The yandere lock has a hard 90s escape hatch, always.
      useEffect(() => {
        if (!lockActive) return undefined
        const escape = setTimeout(() => unlockScreen(false), 90000)
        return () => clearTimeout(escape)
      }, [lockActive])

      useEffect(() => {
        const onDown = (event) => {
          if (!menuOpenRef.current) return
          if (menuRef.current && menuRef.current.contains(event.target)) return
          if (stageRef.current && stageRef.current.contains(event.target)) return
          closeMenu()
        }
        document.addEventListener('pointerdown', onDown, true)
        return () => document.removeEventListener('pointerdown', onDown, true)
      }, [])

      useEffect(() => {
        if (!actionPanelOpen) return undefined
        const onDown = (event) => {
          if (stageRef.current && stageRef.current.contains(event.target)) return
          setActionPanelOpen(false)
        }
        document.addEventListener('pointerdown', onDown, true)
        return () => document.removeEventListener('pointerdown', onDown, true)
      }, [actionPanelOpen])

      useEffect(() => {
        if (!chatOpen) {
          panelRectRef.current = null
          return undefined
        }
        const update = () => {
          if (chatRef.current) panelRectRef.current = chatRef.current.getBoundingClientRect()
        }
        update()
        const timer = setTimeout(update, 80)
        window.addEventListener('resize', update)
        let observer = null
        if (typeof ResizeObserver === 'function' && chatRef.current) {
          observer = new ResizeObserver(update)
          observer.observe(chatRef.current)
        }
        return () => {
          clearTimeout(timer)
          window.removeEventListener('resize', update)
          if (observer) observer.disconnect()
        }
      }, [chatOpen, messages.length, typing])

      useEffect(() => {
        if (!chatOpen) return undefined
        const timer = setTimeout(() => {
          if (inputRef.current) inputRef.current.focus()
        }, 120)
        return () => clearTimeout(timer)
      }, [chatOpen])

      useEffect(() => {
        const container = messagesRef.current
        if (container) container.scrollTop = container.scrollHeight
      }, [messages, typing, chatOpen])

      // -------------------------------------------------------------------
      // Lifecycle: first greeting, decay, idle, sleep timers, teardown
      // -------------------------------------------------------------------

      useEffect(() => {
        mountedRef.current = true
        clampPosition()
        applyTransform()
        checkAi(true)
        const timer = setTimeout(() => {
          if (!mountedRef.current || greetedRef.current) return
          greetedRef.current = true
          const state = stateRef.current
          if (!state.visible) return
          say(greetFor(state.stats, bootstrap.elapsedHours), 'happy')
          playAction('wave', 900)
        }, 4200)
        return () => { clearTimeout(timer) }
      }, [])

      useEffect(() => {
        if (!visible) return undefined
        const timer = setInterval(() => {
          if (document.hidden) return
          setStats((prev) => {
            const active = !stateRef.current.sleeping
            const hunger = clamp(prev.hunger - (active ? 0.26 : 0.1), 0, 100)
            const energy = clamp(prev.energy - (active ? 0.2 : 0), 0, 100)
            const happiness = clamp(prev.happiness + (hunger > 28 ? 0.04 : -0.16), 0, 100)
            return { ...prev, hunger, energy, happiness }
          })
          if (stateRef.current.chatOpen || stateRef.current.sleeping || riceRef.current.phase !== 'off') return
          const idleFor = Date.now() - lastInteractionRef.current
          if (idleFor > 18000 && !dragRef.current.active) {
            const live = liveRef.current
            const now = Date.now()
            const soulNow = soulRef.current
            const behavior = chooseMoodBehavior()
            const lm = live ? liveLayout() : null
            const kitMode = lm ? lm.mode : null
            const kitQuiet = kitMode === 'sit' || kitMode === 'sleep' || kitMode === 'wake'
              || kitMode === 'dizzy' || kitMode === 'drag' || kitMode === 'air' || kitMode === 'look' || kitMode === 'land'
            // Idle speech only; motion is scheduled separately by maybeMoodMotion so
            // two systems cannot fire gestures at the same time.
            if (behavior.lines && !quietRef.current && !stateRef.current.bubble && stateRef.current.action === 'none' && now - (soulNow.lastMoodSayAt || 0) > 55000) {
              commitSoul((s) => ({ ...s, lastMoodSayAt: now }))
              say(pick(behavior.lines), behavior.face || 'content')
            }
          }
        }, 26000)
        return () => clearInterval(timer)
      }, [visible])

      useEffect(() => {
        if (!visible) return undefined
        const root = liveRootRef.current
        const api = window.FatFishLive2D
        const report = (live, message) => {
          try {
            fetch('/fatfish-pet/client-state', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ live, message: String(message || '').slice(0, 300) }),
            }).catch(() => {})
          } catch (error) { /* ignore */ }
        }
        if (!root || !api || typeof api.mountLivePet !== 'function') {
          report('fallback', 'Live2D bundle unavailable')
          setLiveState('fallback')
          return undefined
        }
        let cancelled = false
        let heartbeat = 0
        const onWindowError = (event) => {
          try { report('script-error', `${event.message || 'error'} @${event.filename || ''}:${event.lineno || 0}`) } catch (error) { /* ignore */ }
        }
        const onRejection = (event) => {
          try { report('promise-error', String(event.reason && (event.reason.stack || event.reason.message) || event.reason).slice(0, 280)) } catch (error) { /* ignore */ }
        }
        window.addEventListener('error', onWindowError)
        window.addEventListener('unhandledrejection', onRejection)
        setLiveState('loading')
        report('loading', 'mounting')
        root.innerHTML = ''
        api.mountLivePet(root, {
          width: window.innerWidth,
          height: window.innerHeight,
          floorPad: LIVE_FLOOR_PAD,
          scale: LIVE_SCALE,
          startX: initialPos.current.x + SIZE / 2,
          assetBase: '/fatfish-pet/assets/live2d/',
        }).then((live) => {
          if (cancelled) {
            try { live.destroy() } catch (error) { /* ignore */ }
            return
          }
          liveRef.current = live
          kitRoamOnRef.current = null
          setLiveState('live')
          try { live.setScale?.(LIVE_SCALE * zoomRef.current) } catch (error) { /* ignore */ }
          const liveStatus = () => {
            const layout = liveLayout()
            const cx = layout ? layout.x : posRef.current.x + SIZE / 2
            const mode = layout ? layout.mode : roamRef.current.mode
            const walking = mode === 'walk' || mode === 'run'
            return `${live.scheme ? live.scheme() : 'live2d'} build=${BUILD_TIME.slice(11, 19)} frame=${frameRef.current} last=${Math.round(lastFrameRef.current)} x=${Math.round(cx)} y=${Math.round(window.innerHeight - LIVE_FLOOR_PAD)} vw=${window.innerWidth} vh=${window.innerHeight} mode=${mode} walk=${walking ? 1 : 0} rice=${riceRef.current.phase} bowl=${bowlRef.current ? 1 : 0} brain=${soulRef.current.brainCount || 0} zoom=${zoomRef.current.toFixed(2)} menu=${menuOpenRef.current ? 1 : 0} chat=${chatOpenRef.current ? 1 : 0} sleep=${sleepingRef.current ? 1 : 0} wander=${wanderRef.current ? 1 : 0} drag=${dragRef.current.active ? 1 : 0}`
          }
          report('live', liveStatus())
          heartbeat = setInterval(() => {
            report('live', liveStatus())
          }, 5000)
          try {
            live.do('neutral')
            live.set({ dialogOpen: false, thinking: false })
          } catch (error) { /* ignore */ }
        }).catch((error) => {
          if (cancelled || !mountedRef.current) return
          try { console.warn('[fatfish-pet] Live2D rig unavailable, using sprite fallback', error) } catch (error2) { /* ignore */ }
          report('fallback', error && error.message ? error.message : 'mount failed')
          setLiveState('fallback')
        })
        return () => {
          cancelled = true
          if (heartbeat) clearInterval(heartbeat)
          clearTimeout(flipTimerRef.current)
          window.removeEventListener('error', onWindowError)
          window.removeEventListener('unhandledrejection', onRejection)
          const live = liveRef.current
          liveRef.current = null
          kitRoamOnRef.current = null
          if (live) {
            try { live.destroy() } catch (error) { /* ignore */ }
          }
        }
      }, [visible])

      // Expression controller: only faces from the CURRENT mood stage may appear.
      // Speech temporarily overrides; when the stage changes, the old stage's faces
      // are dropped and the new stage picks from its own pool.
      useEffect(() => {
        if (liveState !== 'live' || sleeping) return undefined
        const tick = () => {
          const live = liveRef.current
          if (!live || typeof live.setExpr !== 'function') return
          refreshMoodStage()
          const soulNow = soulRef.current
          const stage = soulNow.moodStage || 'calm'
          const pool = (MOOD_STAGES[stage] || MOOD_STAGES.calm).faces
          let token = reaction && EMOTIONS.has(reaction.emo) ? reaction.emo : null
          if (!token) {
            const ref = stageFaceRef.current
            const now = Date.now()
            // While she is speaking without a face reaction, keep the current stage
            // face; do not roll a new expression under the bubble.
            if (stateRef.current.bubble) {
              token = ref.token
            } else if (now >= ref.nextAt || !pool.includes(ref.token)) {
              ref.token = pool[Math.floor(Math.random() * pool.length)]
              ref.nextAt = now + rand(9000, 16000)
              setStageFace(ref.token)
              token = ref.token
            } else {
              token = ref.token
            }
          }
          const layout = liveLayout()
          if (layout && ['drag', 'air', 'crouch', 'land', 'dizzy', 'wake', 'tumble'].includes(layout.mode)) return
          try { live.setExpr(LIVE_EMOTION[token] || token, 2.6) } catch (error) { /* ignore */ }
        }
        tick()
        const timer = setInterval(tick, 1300)
        return () => clearInterval(timer)
      }, [effectiveEmotion, sleeping, liveState, soul.moodStage])

      useEffect(() => {
        const live = liveRef.current
        if (!live) return
        try {
          if (sleeping) {
            wasSleepingRef.current = true
            live.do('sleep')
          } else {
            // The kit's sleep is a mode of its own: stand back up before the face.
            if (wasSleepingRef.current) { wasSleepingRef.current = false; live.do('stand') }
            live.do(LIVE_EMOTION[effectiveEmotion] || 'neutral')
          }
        } catch (error) { /* ignore */ }
      }, [effectiveEmotion, sleeping, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live || typeof live.setScale !== 'function') return
        try { live.setScale(LIVE_SCALE * zoom) } catch (error) { /* ignore */ }
      }, [zoom, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live || action === 'none' || sleeping || liveState !== 'live') return
        try { runAction(action) } catch (error) { /* ignore */ }
      }, [action, sleeping, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live) return
        try { live.set({ thinking: typing, dialogOpen: chatOpen, listening }) } catch (error) { /* ignore */ }
      }, [typing, chatOpen, listening, liveState])

      useEffect(() => () => {
        mountedRef.current = false
        clearTimeout(reactionTimerRef.current)
        clearTimeout(actionSwitchTimerRef.current)
        clearTimeout(actionEndTimerRef.current)
        clearTimeout(bubbleTimerRef.current)
        clearTimeout(toastTimerRef.current)
        clearTimeout(hoverTimerRef.current)
        clearTimeout(sleepTimeoutRef.current)
        clearTimeout(flipTimerRef.current)
        clearInterval(sleepIntervalRef.current)
        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
        }
        if (recognitionRef.current) {
          try { recognitionRef.current.abort() } catch (error) { /* ignore */ }
        }
        if (typeof window.speechSynthesis !== 'undefined') {
          try { window.speechSynthesis.cancel() } catch (error) { /* ignore */ }
        }
      }, [])

      // -------------------------------------------------------------------
      // Pointer + keyboard interactions on the fish
      // -------------------------------------------------------------------

      function onStagePointerDown(event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return
        event.stopPropagation()
        try { event.currentTarget.focus({ preventScroll: true }) } catch (error) { /* ignore */ }
        closeMenu()
        setActionPanelOpen(false)
        setSettingsOpen(false)
        dragRef.current = {
          active: true,
          moved: false,
          kitGrabbed: false,
          pointerId: event.pointerId,
          offsetX: event.clientX - posRef.current.x,
          offsetY: event.clientY - posRef.current.y,
          startX: event.clientX,
          startY: event.clientY,
          startAt: Date.now(),
          lastX: event.clientX,
          lastY: event.clientY,
          lastAt: performance.now(),
        }
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch (error) { /* ignore */ }
        setDragging(true)
        setHovered(true)
        if (sleepingRef.current) wakeUp(true)
        else flashEmotion('surprised', 700)
        lastInteractionRef.current = Date.now()
      }

      function onStagePointerMove(event) {
        const drag = dragRef.current
        if (!drag.active || event.pointerId !== drag.pointerId) return
        event.preventDefault()
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true
        const live = liveRef.current
        if (live && drag.moved) {
          // The kit body takes the drag: it is picked up by the scruff, follows
          // the pointer, and is thrown on release with real physics.
          if (!drag.kitGrabbed) {
            drag.kitGrabbed = true
            // Start the kit's press on the body itself (the box corners are outside
            // its hit circle) and then hand the real pointer position over.
            const layout = liveLayout()
            const hit = layout && Array.isArray(layout.hit) && layout.hit[0] ? layout.hit[0] : null
            const down = hit ? { x: hit.x, y: hit.y } : { x: drag.startX, y: drag.startY }
            try { live.pointer('down', down) } catch (error) { /* ignore */ }
          }
          try { live.pointer('move', { x: event.clientX, y: event.clientY }) } catch (error) { /* ignore */ }
          return
        }
        const pos = posRef.current
        const now = performance.now()
        const dt = Math.max(1, now - drag.lastAt)
        pos.vx = (event.clientX - drag.lastX) / dt
        pos.vy = (event.clientY - drag.lastY) / dt
        pos.x = clamp(event.clientX - drag.offsetX, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.y = clamp(event.clientY - drag.offsetY, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
        drag.lastX = event.clientX
        drag.lastY = event.clientY
        drag.lastAt = now
        applyTransform()
      }

      function onStagePointerUp(event) {
        const drag = dragRef.current
        if (!drag.active || event.pointerId !== drag.pointerId) return
        drag.active = false
        setDragging(false)
        try { event.currentTarget.releasePointerCapture(event.pointerId) } catch (error) { /* ignore */ }
        const live = liveRef.current
        if (live && drag.kitGrabbed) {
          try { live.pointer('up', { x: event.clientX, y: event.clientY }) } catch (error) { /* ignore */ }
          const nowDrag = Date.now()
          const soulNow = soulRef.current
          const recent = nowDrag - (soulNow.lastDragAt || 0) < 45000
          const dragCount = recent ? (soulNow.dragCount || 0) + 1 : 1
          commitSoul((s) => ({ ...s, dragCount: dragCount, lastDragAt: nowDrag }))
          appraise('drag', 0.8, { user: false })
          if (dragCount >= 3) startAnger('别、别再把我拎起来了！', 15000)
          lastInteractionRef.current = Date.now()
          saveState()
          return
        }
        const pos = posRef.current
        const wasClick = !drag.moved && Date.now() - drag.startAt < 440
        if (wasClick) {
          // A click is also a touch: wake a dozing kit and stop a walk she is in.
          if (live) { try { live.do('stand') } catch (error) { /* ignore */ } }
          const now = Date.now()
          const previous = lastClickRef.current
          const isDouble = now - previous.at < 340 && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 28
          lastClickRef.current = { at: isDouble ? 0 : now, x: event.clientX, y: event.clientY }
          if (isDouble) openChat()
          else petBodyPart(clickZone(event.clientX, event.clientY))
          return
        }
        const speed = Math.hypot(pos.vx, pos.vy)
        pos.tx = clamp(pos.x + pos.vx * 150, 24, Math.max(24, window.innerWidth - SIZE - 24))
        pos.ty = clamp(pos.y + pos.vy * 150, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 16))
        pos.nextTargetAt = performance.now() + rand(3800, 6800)
        if (speed > 0.8) {
          flashEmotion('dizzy', 1400)
          playAction('shake', 520)
          say('哇——别把我甩出去！我的鲸尾都打结了…', 'dizzy')
        } else {
          flashEmotion('happy', 1000)
        }
        lastInteractionRef.current = Date.now()
        saveState()
      }

      function onStageKeyDown(event) {
        const key = event.key
        if (key === 'Enter' || key === ' ') {
          event.preventDefault()
          petTheFish()
        } else if (key === 'c' || key === 'C') {
          event.preventDefault()
          openChat()
        } else if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
          event.preventDefault()
          const live = liveRef.current
          if (live && !sleepingRef.current) {
            const layout = liveLayout()
            const roam = roamRef.current
            if (layout && (key === 'ArrowLeft' || key === 'ArrowRight')) {
              const maxC = Math.max(LIVE_INSET, window.innerWidth - LIVE_INSET)
              const targetC = clamp(layout.x + (key === 'ArrowRight' ? 30 : -30), LIVE_INSET, maxC)
              roam.walkId = `key-${Math.round(performance.now())}`
              roam.state = 'moving'
              roam.until = performance.now() + 4000
              liveWalk(targetC, false, roam.walkId)
            } else if (key === 'ArrowUp') {
              try { live.do('hop') } catch (error) { /* ignore */ }
            } else {
              try { live.do('sit') } catch (error) { /* ignore */ }
            }
            lastInteractionRef.current = Date.now()
            return
          }
          const pos = posRef.current
          const step = 22
          if (key === 'ArrowLeft') pos.x -= step
          if (key === 'ArrowRight') pos.x += step
          if (key === 'ArrowUp') pos.y -= step
          if (key === 'ArrowDown') pos.y += step
          pos.tx = pos.x
          pos.ty = pos.y
          clampPosition()
          applyTransform()
          saveState()
        }
      }

      function onHoverStart() {
        setHovered(true)
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = setTimeout(() => {
          if (!mountedRef.current || dragRef.current.active) return
          if (!chatOpenRef.current && !menuOpenRef.current && !sleepingRef.current && !stateRef.current.bubble) {
            flashEmotion('curious', 1400)
            playAction('nod', 600)
          }
        }, 750)
      }

      function onHoverEnd() {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setHovered(false)
        }, 280)
      }

      // -------------------------------------------------------------------
      // Render helpers
      // -------------------------------------------------------------------

      const stageClasses = [
        'ffish-stage',
        `ffish--emo-${effectiveEmotion}`,
        action !== 'none' && liveState !== 'live' ? `ffish--act-${action}` : '',
        dragging ? 'ffish--dragging' : '',
      ].filter(Boolean).join(' ')

      const EMOTE_GLYPHS = {
        normal: [],
        happy: ['✦', '✦'],
        love: ['♥', '♥', '♥'],
        wink: ['✦'],
        excited: ['!', '✦'],
        flustered: ['💦'],
        pout: ['…'],
        smug: ['✦'],
        worried: ['…'],
        determined: ['!'],
        scared: ['!'],
        cry: ['💧'],
        content: ['✦'],
        shy: ['♥', '♥'],
        curious: ['?', '?'],
        thinking: ['·', '·', '·'],
        sleepy: ['Z', 'z', 'z'],
        hungry: ['…'],
        surprised: ['!'],
        annoyed: ['💢'],
        sad: ['💧'],
        proud: ['✦', '✦'],
        dizzy: ['◎', '◎'],
      }
      const emoteGlyphs = EMOTE_GLYPHS[effectiveEmotion] || []

      const bubbleAttach = bubble
        ? [
          'ffish-bubble',
          orientation.above ? 'above' : 'below',
          orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : '',
        ].filter(Boolean).join(' ')
        : ''

      const toolbarClasses = [
        'ffish-toolbar',
        orientation.above ? 'above' : 'below',
        orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : '',
      ].filter(Boolean).join(' ')

      const statsItems = [
        { key: 'hunger', value: stats.hunger, label: t('ui.hunger'), tone: 'hunger' },
        { key: 'energy', value: stats.energy, label: t('ui.energy'), tone: 'energy' },
        { key: 'happiness', value: stats.happiness, label: t('ui.mood'), tone: 'mood' },
      ]

      function menuItem(label, icon, onSelect, extra) {
        return h('button', {
          key: label,
          type: 'button',
          role: 'menuitem',
          className: 'ffish-menu-item',
          onClick: () => { closeMenu(); onSelect() },
        }, h('span', { className: 'ffish-menu-icon' }, h(Icon, { name: icon, size: 15 })),
          h('span', { className: 'ffish-menu-label' }, label),
          extra ? h('span', { className: 'ffish-menu-extra' }, extra) : null)
      }

      const menuItems = [
        menuItem(t('menu.chat'), 'chat', openChat),
        menuItem(sleeping ? t('menu.wake') : t('menu.sleep'), sleeping ? 'wake' : 'sleep', () => { sleeping ? wakeUp(true) : goSleep() }),
        menuItem(t('menu.feed'), 'feed', feedFish),
        menuItem(t('menu.actions'), 'sparkle', () => setActionPanelOpen(true)),
      menuItem(t('menu.agent'), 'sparkle', () => {
        setMenuOpen(false)
        setAgentAskOpen(true)
        setAgentAskText('')
      }),
        menuItem(t('menu.rename'), 'settings', () => {
          setChatOpen(true)
          if (sleepingRef.current) wakeUp(false)
          openSettings()
        }),
        menuItem(wander ? t('menu.wanderOn') : t('menu.wanderOff'), 'wake', () => {
          setWander((value) => !value)
          showToast(`${t('ui.wander')} · ${!wander ? 'ON' : 'OFF'}`, 1500)
        }, wander ? '·' : ''),
        menuItem(quiet ? t('menu.quietOn') : t('menu.quietOff'), 'sleep', () => {
          setQuiet((value) => !value)
          showToast(`${t('ui.quiet')} · ${!quiet ? 'ON' : 'OFF'}`, 1500)
        }, quiet ? '·' : ''),
        menuItem(t('menu.zoomIn'), 'plus', () => { applyZoom(zoomRef.current + 0.1); showToast(`×${zoomRef.current.toFixed(1)}`, 900) }),
        menuItem(t('menu.zoomOut'), 'minus', () => { applyZoom(zoomRef.current - 0.1); showToast(`×${zoomRef.current.toFixed(1)}`, 900) }),
        menuItem(t('menu.zoomReset'), 'reset', () => { applyZoom(1); showToast('×1.0', 900) }),
        menuItem(t('menu.hide'), 'hide', hidePet),
      ]

      const actionButtons = [
        { key: 'wave', label: t('action.wave') },
        { key: 'bow', label: t('action.bow') },
        { key: 'dance', label: t('action.dance') },
        { key: 'heart', label: t('action.heart') },
        { key: 'shy', label: t('action.shy') },
        { key: 'yawn', label: t('action.yawn') },
        { key: 'angry', label: t('action.angry') },
        { key: 'sit', label: t('action.sit') },
        { key: 'look', label: t('action.look') },
      ]

      function performAction(key) {
        setActionPanelOpen(false)
        lastInteractionRef.current = Date.now()
        pushEvent(`做了动作：${key}`)
        addBond(1.2, 0.4)
        const persona = soulRef.current.persona || 'tsundere'
        const table = PERSONA_ACTIONS[persona] || PERSONA_ACTIONS.tsundere
        const entry = table[key]
        if (entry) {
          runAction(key)
          say(pick(entry.lines), { emotion: entry.face, action: entry.action })
          return
        }
        runAction(key)
      }

      const toolbarButtons = [
        { key: 'chat', icon: 'chat', label: t('ui.chat'), onClick: openChat },
        { key: 'feed', icon: 'feed', label: t('ui.feed'), onClick: feedFish },
        { key: 'play', icon: 'play', label: t('ui.play'), onClick: playWithFish },
        { key: 'sleep', icon: sleeping ? 'wake' : 'sleep', label: sleeping ? t('ui.wake') : t('ui.sleep'), onClick: () => { sleeping ? wakeUp(true) : goSleep() } },
        { key: 'actions', icon: 'sparkle', label: t('ui.actions'), onClick: () => setActionPanelOpen((value) => !value) },
      ]

      // -------------------------------------------------------------------
      // Final render
      // -------------------------------------------------------------------

      const goneNow = soul.gone && soul.vanishUntil > Date.now()
      if (!visible) {
        return h(Fragment, null,
          h('style', { key: 'style', dangerouslySetInnerHTML: { __html: UI_CSS } }),
          goneNow ? h('div', { key: 'gone', className: 'ffish-gone-note' }, '……（她不在家。）') : h('button', {
            key: 'summon',
            type: 'button',
            className: 'ffish-summon',
            title: t('ui.summon'),
            'aria-label': t('ui.summon'),
            onPointerDown: (event) => { event.stopPropagation() },
            onClick: () => {
              if (soulRef.current.gone) {
                showToast('……（她不在，喊也没用。）', 2600)
                return
              }
              setVisible(true)
            },
          },
            h('span', { className: 'ffish-summon-face', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
            h('span', { className: 'ffish-summon-text' }, t('ui.summon')),
          ),
          toast ? h('div', { key: 'toast', className: 'ffish-toast', role: 'status', 'aria-live': 'polite' }, toast.text) : null,
        )
      }


      // Screen-off / idle deep sleep. The host page cannot receive Windows lock events
      // directly, so use Page Visibility + an idle timer; the Electron host adds
      // powerMonitor lock/suspend events through window.fatfishPet.
      useEffect(() => {
        function scheduleIdle() {
          clearTimeout(idleSleepTimerRef.current)
          if (!soulRef.current.settings.sleepOnScreenOff) return
          const minutes = Number(soulRef.current.settings.idleSleepMinutes)
          if (!Number.isFinite(minutes) || minutes <= 0) return
          idleSleepTimerRef.current = setTimeout(() => enterDeepSleep('idle'), Math.min(minutes, 120) * 60000)
        }
        function enterDeepSleep(reason) {
          if (!soulRef.current.settings.sleepOnScreenOff) return
          if (systemSleepingRef.current) return
          systemSleepingRef.current = true
          deepSleepWasSleepingRef.current = sleepingRef.current
          setSystemSleeping(true)
          if (!sleepingRef.current) setSleeping(true)
          setChatOpen(false)
          setSettingsOpen(false)
          setMenuOpen(false)
          setAgentAskOpen(false)
          setActionPanelOpen(false)
          setBubble(null)
          try { if (agentAbortRef.current) agentAbortRef.current.abort() } catch { /* ignore */ }
          agentBusyRef.current = false
          clearTimeout(idleSleepTimerRef.current)
        }
        function leaveDeepSleep() {
          if (!systemSleepingRef.current) return
          systemSleepingRef.current = false
          setSystemSleeping(false)
          if (!deepSleepWasSleepingRef.current) setSleeping(false)
          scheduleIdle()
        }
        function onVisibility() {
          if (document.hidden) enterDeepSleep('hidden')
          else leaveDeepSleep()
        }
        function onActivity() {
          if (systemSleepingRef.current) leaveDeepSleep()
          else scheduleIdle()
        }
        function onSystemSleep() { enterDeepSleep('system') }
        function onSystemWake() { leaveDeepSleep() }
        function onFocus() { if (systemSleepingRef.current) leaveDeepSleep(); else scheduleIdle() }
        document.addEventListener('visibilitychange', onVisibility)
        window.addEventListener('pointerdown', onActivity, true)
        window.addEventListener('keydown', onActivity, true)
        window.addEventListener('focus', onFocus)
        const bridge = typeof window !== 'undefined' ? window.fatfishPet : null
        let offSleep = null
        let offWake = null
        if (bridge && typeof bridge.onSystemSleep === 'function') offSleep = bridge.onSystemSleep(onSystemSleep)
        if (bridge && typeof bridge.onSystemWake === 'function') offWake = bridge.onSystemWake(onSystemWake)
        scheduleIdle()
        return () => {
          clearTimeout(idleSleepTimerRef.current)
          document.removeEventListener('visibilitychange', onVisibility)
          window.removeEventListener('pointerdown', onActivity, true)
          window.removeEventListener('keydown', onActivity, true)
          window.removeEventListener('focus', onFocus)
          if (typeof offSleep === 'function') offSleep()
          if (typeof offWake === 'function') offWake()
        }
      }, [])

      return h('div', { className: `ffish-pet-root ${systemSleeping ? 'ffish-deep-sleep' : ''}`.trim(), 'data-build': BUILD_TIME },
        h('style', { key: 'style', dangerouslySetInnerHTML: { __html: UI_CSS } }),

        // The kit body lives on a viewport-sized stage: its own walk/run physics
        // move her, and this overlay only follows where the body says it is.
        h('div', {
          key: 'live-stage',
          ref: liveRootRef,
          className: 'ffish-live-stage',
          'aria-hidden': 'true',
        }),

        riceOn ? h('div', {
          key: `rice-${riceKey}`,
          ref: bowlRef,
          className: 'ffish-rice',
          'aria-hidden': 'true',
          style: { transform: `translate3d(${riceRef.current.lastBowlX}px, ${riceRef.current.lastBowlY}px, 0)` },
        },
          h('span', { className: 'ffish-rice-inner' },
            h('span', { className: 'ffish-rice-spark s0' }, '✦'),
            h('span', { className: 'ffish-rice-bowl' }, '🍚'),
            h('span', { className: 'ffish-rice-spark s1' }, '✦'),
            h('span', { className: 'ffish-rice-steam' }, '﹏'),
          ),
        ) : null,

        h('div', {
          key: 'stage',
          ref: stageRef,
          className: stageClasses,
          style: { transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`, '--ffish-zoom': zoom.toFixed(2) },
        },
          h('div', {
            className: 'ffish-hit',
            role: 'button',
            tabIndex: 0,
            'aria-label': `${name} · ${t('ui.chat')} · ${t('ui.feed')} · ${t('ui.play')} · ${t('ui.sleep')} (Alt+Shift+C / Alt+Shift+F)`,
            'aria-roledescription': 'pet',
            onPointerDown: onStagePointerDown,
            onPointerMove: onStagePointerMove,
            onPointerUp: onStagePointerUp,
            onPointerCancel: onStagePointerUp,
            onPointerEnter: onHoverStart,
            onPointerLeave: onHoverEnd,
            onDoubleClick: (event) => { event.preventDefault(); event.stopPropagation(); openChat() },
            onContextMenu: openMenu,
            onKeyDown: onStageKeyDown,
            onDragStart: (event) => event.preventDefault(),
          },
            h('div', { className: 'ffish-action', 'aria-hidden': 'true' },
              h('div', { ref: fishRef, className: 'ffish-character' },
                liveState === 'live' ? null : h('div', { className: 'ffish-sprite' }),
              ),
            ),
          ),

          liveState !== 'live' && emoteGlyphs.length > 0 ? h('div', {
            key: 'emote',
            className: `ffish-emote ffish-emote-${effectiveEmotion}`,
            'aria-hidden': 'true',
          }, emoteGlyphs.map((glyph, index) => h('span', {
            key: index,
            className: `ffish-emote-glyph ffish-emote-glyph-${index}`,
          }, glyph))) : null,

          bubble ? h('div', {
            key: bubble.key,
            className: bubbleAttach,
            role: 'status',
            'aria-live': 'polite',
          }, bubble.text) : null,

          liveState !== 'live' && sleeping && !chatOpen ? h('div', { key: 'zzz', className: 'ffish-zzz', 'aria-hidden': 'true' },
            h('span', null, 'z'), h('span', null, 'z'), h('span', null, 'z')) : null,

          hovered && !chatOpen && !menuOpen && !dragging && !actionPanelOpen && !bubble ? h('div', {
            key: 'toolbar',
            className: toolbarClasses,
            onPointerEnter: onHoverStart,
            onPointerLeave: onHoverEnd,
          },
            toolbarButtons.map((button) => h('button', {
              key: button.key,
              type: 'button',
              className: 'ffish-tool',
              title: button.label,
              'aria-label': button.label,
              onPointerDown: (event) => { event.preventDefault(); event.stopPropagation() },
              onClick: (event) => { event.preventDefault(); event.stopPropagation(); button.onClick() },
            }, h(Icon, { name: button.icon, size: 17 })))) : null,

          actionPanelOpen && !chatOpen ? h('div', {
            key: 'actions',
            className: `ffish-actions-panel ${orientation.above ? 'above' : 'below'} ${orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : ''}`.trim(),
            onPointerDown: (event) => event.stopPropagation(),
          }, actionButtons.map((button) => h('button', {
            key: button.key,
            type: 'button',
            className: 'ffish-action-chip',
            onPointerDown: (event) => { event.preventDefault(); event.stopPropagation() },
            onClick: (event) => { event.preventDefault(); event.stopPropagation(); performAction(button.key) },
          }, button.label))) : null,
        ),

        menuOpen ? h('div', {
          key: 'menu',
          ref: menuRef,
          className: 'ffish-menu',
          role: 'menu',
          'aria-label': `${name} · ${t('menu.chat')}`,
          style: { left: `${menuPos.x}px`, top: `${menuPos.y}px` },
          onPointerDown: (event) => event.stopPropagation(),
        },
          h('div', { className: 'ffish-menu-head' },
            h('span', { className: 'ffish-menu-name' }, name),
            h('span', { className: 'ffish-menu-badge' }, affinityText),
          ),
          menuItems,
        ) : null,

        agentAskOpen ? h('div', {
          key: 'agent-ask',
          className: 'ffish-agent-ask',
          role: 'dialog',
          'aria-label': t('agent.askTitle'),
        },
          h('div', { className: 'ffish-agent-ask-head' },
            h('div', { className: 'ffish-agent-ask-title' }, t('agent.askTitle')),
            h('button', {
              type: 'button',
              className: 'ffish-icon-btn',
              title: t('agent.cancel'),
              'aria-label': t('agent.cancel'),
              onClick: () => setAgentAskOpen(false),
            }, h(Icon, { name: 'close', size: 17 })),
          ),
          h('div', { className: 'ffish-agent-ask-hint' },
            `权限：${currentPermissionLabel()}`,
            soul.settings.workspace ? ` · 工作区已配置` : ' · 工作区未配置',
            soul.settings.permission > 0 ? '' : '。提高权限后可读文件；「任务交给主 Agent」可在设置里开启。',
          ),
          h('textarea', {
            className: 'ffish-agent-ask-input',
            value: agentAskText,
            maxLength: 240,
            rows: 3,
            placeholder: t('agent.askPlaceholder'),
            onChange: (event) => setAgentAskText(event.target.value),
            onKeyDown: (event) => {
              if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitAgentAsk() }
            },
          }),
          h('div', { className: 'ffish-agent-ask-chips' },
            [
              [t('agent.quickWorkspace'), '看看工作区里有什么，挑重点告诉我'],
              [t('agent.quickPlan'), '帮我理一下接下来该做什么'],
              [t('agent.quickRemind'), '25 分钟后提醒我起来休息'],
            ].map(([label, value]) => h('button', {
              key: label,
              type: 'button',
              className: 'ffish-agent-ask-chip',
              onClick: () => setAgentAskText(value),
            }, label)),
          ),
          h('div', { className: 'ffish-agent-ask-actions' },
            h('button', { type: 'button', className: 'ffish-text-btn ghost', onClick: () => setAgentAskOpen(false) }, t('agent.cancel')),
            h('button', { type: 'button', className: 'ffish-text-btn primary', onClick: submitAgentAsk }, t('agent.start')),
          ),
        ) : null,

        chatOpen ? h('section', {
          key: 'chat',
          ref: chatRef,
          className: `ffish-chat ${settingsOpen ? 'settings-open' : ''}`.trim(),
          role: 'dialog',
          'aria-modal': 'false',
          'aria-label': `${name} · ${t('ui.chat')}`,
        },
          h('header', { className: 'ffish-chat-head' },
            h('div', { className: 'ffish-chat-portrait', 'aria-hidden': 'true' },
              h('i', { className: 'ffish-avatar-face' })),
            h('div', { className: 'ffish-chat-id' },
              h('button', {
                type: 'button',
                className: 'ffish-chat-name',
                onClick: openSettings,
                title: t('ui.settings'),
              }, name, h(Icon, { name: 'chevron', size: 13 })),
              h('span', { className: `ffish-chat-status ${aiInfo.ai ? 'online' : 'local'}` },
                h('i', null),
                listening ? t('ui.listening') : typing ? t('ui.thinking') : aiInfo.ai ? t('ui.online') : t('ui.local'),
              ),
            ),
            h('div', { className: 'ffish-chat-tools' },
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.agent'),
                'aria-label': t('ui.agent'), onClick: () => { setAgentAskOpen(true); setAgentAskText('') },
              }, h(Icon, { name: 'sparkle', size: 16 })),
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.settings'),
                'aria-label': t('ui.settings'), onClick: openSettings,
              }, h(Icon, { name: 'settings', size: 16 })),
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.close'),
                'aria-label': t('ui.close'), onClick: closeChat,
              }, h(Icon, { name: 'close', size: 16 })),
            ),
            settingsOpen ? h('div', { className: 'ffish-settings', role: 'group', 'aria-label': t('ui.settings') },
              h('div', { className: 'ffish-settings-head' },
                h('div', { className: 'ffish-settings-title' }, t('ui.settings')),
                h('button', {
                  type: 'button',
                  className: 'ffish-icon-btn ffish-settings-close',
                  title: t('ui.cancel'),
                  'aria-label': t('ui.cancel'),
                  onClick: () => setSettingsOpen(false),
                }, h(Icon, { name: 'close', size: 17 })),
              ),
              h('label', { className: 'ffish-field' },
                h('span', null, t('ui.petName')),
                h('input', {
                  value: nameDraft,
                  maxLength: 10,
                  onChange: (event) => setNameDraft(event.target.value),
                }),
              ),
              h('label', { className: 'ffish-field' },
                h('span', null, t('ui.userName')),
                h('input', {
                  value: userNameDraft,
                  maxLength: 10,
                  onChange: (event) => setUserNameDraft(event.target.value),
                }),
              ),
              h('button', {
                type: 'button',
                className: `ffish-switch ${wanderDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': wanderDraft,
                onClick: () => setWanderDraft((value) => !value),
              }, h('span', null, t('ui.wander')), h('i', null)),
              h('button', {
                type: 'button',
                className: `ffish-switch ${quietDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': quietDraft,
                onClick: () => setQuietDraft((value) => !value),
              }, h('span', null, t('ui.quiet')), h('i', null)),
              h('button', {
                type: 'button',
                className: `ffish-switch ${voiceDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': voiceDraft,
                onClick: () => setVoiceDraft((value) => !value),
              }, h('span', null, t('ui.speak')), h('i', null)),
              h('div', { className: 'ffish-soul' },
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '好感度'),
                  h('b', null, `${Math.round(soul.favor)}`),
                  h('em', null, favorLabel(soul.favor)),
                ),
                h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.favor, 0, 100)}%` } })),
                h('div', { className: 'ffish-soul-traits ffish-soul-ocean' },
                  [['O', '开放'], ['C', '尽责'], ['E', '外向'], ['A', '宜人'], ['N', '敏感']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.ocean[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '心情'),
                  h('em', null, soul.mood.valence >= 20 ? '开心' : soul.mood.valence <= -20 ? '低落' : '平静'),
                  h('b', null, `紧张 ${Math.round(soul.mood.stress)}`),
                ),
                h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp((soul.mood.valence + 100) / 2, 0, 100)}%` } })),
                h('div', { className: 'ffish-soul-traits' },
                  [['belonging', '归属'], ['autonomy', '自主'], ['competence', '胜任']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.needs[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-traits' },
                  [['trust', '信任'], ['resentment', '怨气'], ['security', '安全感']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.relation[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '用户印象'),
                  h('em', null, `响应 ${Math.round(soul.userModel.responsiveness)} · 关心 ${Math.round(soul.userModel.care)}`),
                ),
                soul.selfNarrative ? h('div', { className: 'ffish-soul-narrative' }, `“${soul.selfNarrative}”`) : null,
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '反思'),
                  h('b', null, `${soul.reflections || 0} 次`),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    disabled: !!soul.reflectionBusy,
                    onClick: () => reflectSoul(true),
                  }, soul.reflectionBusy ? '思考中…' : '让她想想'),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '性格'),
                  h('b', null, PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '未选择'),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    onClick: () => setPersonaOpen(true),
                  }, '重选'),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '微调'),
                  h('b', { className: 'ffish-soul-custom' }, soul.customPersona ? soul.customPersona : '（用一句话描述她）'),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    onClick: () => setPersonaOpen(true),
                  }, '编辑'),
                ),
                h('div', { className: 'ffish-soul-traits' },
                  [['closeness', '亲密度'], ['jealousy', '占有欲'], ['dependence', '依赖']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.traits[key] || 0, 0, 100)}%` } })),
                    )
                  )),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '此刻'),
                  h('b', null, angry ? '生气中' : soul.warped ? '有点黑化' : favorBand() === 'frozen' ? '心灰意冷'
                    : favorBand() === 'cold' ? '冷战' : favorBand() === 'clingy' ? '黏人' : '还算亲近'),
                ),
                h('div', { className: 'ffish-agent-config' },
                  h('div', { className: 'ffish-soul-row' }, h('span', null, 'AI 模型')),
                  h('select', {
                    className: 'ffish-select',
                    value: (soul.modelSelection && soul.modelSelection.provider ? soul.modelSelection.provider + '::' + soul.modelSelection.model : ''),
                    onChange: (event) => {
                      const value = event.target.value
                      if (!value) { commitSoul((x) => ({ ...x, modelSelection: { provider: '', model: '' } })); return }
                      const parts = value.split('::')
                      commitSoul((x) => ({ ...x, modelSelection: { provider: parts[0] || '', model: parts[1] || '' } }))
                    },
                  },
                  h('option', { value: '' }, '跟随 Harness 默认'),
                  modelOptions.flatMap((provider) => (provider.models || []).map((model) => h('option', {
                    key: provider.id + '::' + model.id,
                    value: provider.id + '::' + model.id,
                  }, (provider.name || provider.id) + ' / ' + (model.name || model.id))))),
                  h('div', { className: 'ffish-soul-row' }, h('span', null, 'Agent 权限')),
                  h('select', {
                    className: 'ffish-select',
                    value: String(soul.settings.permission || 0),
                    onChange: (event) => adjustSoulSetting('permission', Number(event.target.value)),
                  },
                  h('option', { value: '0' }, '0 · 只能聊天（不可访问文件）'),
                  h('option', { value: '1' }, '1 · 只读工作区'),
                  h('option', { value: '2' }, '2 · 读写工作区'),
                  h('option', { value: '3' }, '3 · 完全授权（可执行命令）')),
                  h('div', { className: 'ffish-soul-row' }, h('span', null, '工作区')),
                  h('input', {
                    className: 'ffish-input',
                    value: soul.settings.workspace || '',
                    placeholder: '例如 E:\\project',
                    onChange: (event) => adjustSoulSetting('workspace', event.target.value),
                  }),
                  h('div', { className: 'ffish-agent-note' }, '首次使用 Agent 文件能力前，请先在设置里填写工作区；权限越高她能动的东西越多。'),
                  !soul.settings.agent ? h('div', { className: 'ffish-agent-warn' }, 'Agent 模式已关闭：右键「让她想想办法」和 /agent 都不会执行。') : null,
                  (soul.settings.permission || 0) > 0 && !(soul.settings.workspace || '').trim() ? h('div', { className: 'ffish-agent-warn' }, 'Agent 权限已开启，但工作区为空：她只能聊天/记忆/提醒，无法读写文件或执行命令。') : null,
                  h('details', { className: 'ffish-agent-advanced' },
                    h('summary', null, 'Agent 高级参数 / 休眠'),
                    h('div', { className: 'ffish-advanced-grid' },
                      [
                        ['最大工具步数', 'agentSteps', 1, 20, 1, '研究越深越大'],
                        ['搜索条数', 'agentSearchResults', 1, 10, 1, '每次搜索返回几条'],
                        ['网页正文上限', 'agentFetchChars', 1000, 20000, 500, '抓取网页保留字符数'],
                        ['单步超时（秒）', 'agentTimeoutSec', 10, 180, 5, '模型/工具等待时间'],
                        ['回答长度上限', 'agentAnswerChars', 200, 4000, 100, '聊天里最多保留多少字'],
                        ['模型温度', 'agentTemperature', 0, 1.2, 0.05, '越高越发散'],
                      ].map(([label, key, min, max, step, hint]) => h('label', { key, className: 'ffish-advanced-field' },
                        h('span', null, label),
                        h('input', {
                          className: 'ffish-input small',
                          type: 'number',
                          min: min,
                          max: max,
                          step: step,
                          value: Number(soul.settings[key] !== undefined ? soul.settings[key] : min),
                          onChange: (event) => {
                            const raw = Number(event.target.value)
                            adjustSoulSetting(key, clamp(Number.isFinite(raw) ? raw : min, min, max))
                          },
                        }),
                        h('em', null, hint),
                      )),
                    ),
                    h('div', { className: 'ffish-advanced-toggles' },
                      h('button', {
                        type: 'button', className: `ffish-switch tiny ${soul.settings.agentWeb !== false ? 'on' : ''}`,
                        onClick: () => adjustSoulSetting('agentWeb', !(soul.settings.agentWeb !== false)),
                      }, h('span', null, '联网工具'), h('i', null)),
                      h('button', {
                        type: 'button', className: `ffish-switch tiny ${soul.settings.sleepOnScreenOff ? 'on' : ''}`,
                        onClick: () => adjustSoulSetting('sleepOnScreenOff', !soul.settings.sleepOnScreenOff),
                      }, h('span', null, '息屏后沉睡'), h('i', null)),
                    ),
                    h('div', { className: 'ffish-advanced-idle' },
                      h('span', null, '无操作休眠（分钟，0=关闭）'),
                      h('input', {
                        className: 'ffish-input small',
                        type: 'number',
                        min: 0,
                        max: 120,
                        step: 1,
                        value: Number(soul.settings.idleSleepMinutes || 0),
                        onChange: (event) => {
                          const raw = Number(event.target.value)
                          adjustSoulSetting('idleSleepMinutes', clamp(Number.isFinite(raw) ? raw : 0, 0, 120))
                        },
                      }),
                    ),
                    h('div', { className: 'ffish-agent-note' }, '改完立即生效；步数、搜索条数和正文上限越大，研究越深，但耗时和 token 消耗也越高。'),
                  ),
                ),
                h('div', { className: 'ffish-soul-switches' },
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.noise ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('noise', !soul.settings.noise),
                  }, h('span', null, '生气哼声'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.lock ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('lock', !soul.settings.lock),
                  }, h('span', null, '病娇锁屏'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.brain ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('brain', !soul.settings.brain),
                  }, h('span', null, 'AI 即时反应'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.agent ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('agent', !soul.settings.agent),
                  }, h('span', null, 'Agent 模式'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.delegateAgent ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('delegateAgent', !soul.settings.delegateAgent),
                  }, h('span', null, '任务交给主 Agent'), h('i', null)),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, 'AI 即时反应'),
                  h('b', null, `${soul.brainCount || 0} 次`),
                  h('em', null, `Agent ${soul.agentRuns || 0} 次`),
                ),
              ),
              h('div', { className: 'ffish-settings-actions' },
                h('button', {
                  type: 'button', className: 'ffish-text-btn',
                  onClick: () => { setMessages([]); setSettingsOpen(false); showToast(t('ui.clearChat'), 1200) },
                }, t('ui.clearChat')),
                h('button', { type: 'button', className: 'ffish-text-btn ghost', onClick: () => setSettingsOpen(false) }, t('ui.cancel')),
                h('button', { type: 'button', className: 'ffish-text-btn primary', onClick: saveSettings }, t('ui.save')),
              ),
            ) : null,
          ),

          h('div', { className: 'ffish-stats' },
            statsItems.map((item) => h('div', { key: item.key, className: `ffish-stat ${item.tone}` },
              h('div', { className: 'ffish-stat-line' },
                h('span', null, item.label),
                h('b', null, `${Math.round(item.value)}`),
              ),
              h('div', { className: 'ffish-stat-track' },
                h('i', { style: { width: `${clamp(item.value, 0, 100)}%` } }),
              ),
            )),
          ),

          h('div', { className: 'ffish-messages', ref: messagesRef, 'aria-live': 'polite' },
            messages.map((message) => h('div', {
              key: message.id,
              className: `ffish-msg ${message.role === 'user' ? 'from-user' : 'from-pet'}`,
            },
              message.role === 'pet' ? h('span', { className: 'ffish-msg-avatar', 'aria-hidden': 'true' }, h(TinyFishAvatar)) : null,
              h('div', { className: 'ffish-msg-bubble' },
                message.text ? message.text : h(TypingDots),
              ),
            )),
            typing && messages.length > 0 && !messages[messages.length - 1].streaming
              ? h('div', { className: 'ffish-msg from-pet' },
                h('span', { className: 'ffish-msg-avatar', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
                h('div', { className: 'ffish-msg-bubble' }, h(TypingDots)))
              : null,
          ),

          h('form', {
            className: 'ffish-composer',
            onSubmit: (event) => {
              event.preventDefault()
              const value = input.trim()
              if (!value) return
              submitMessage(value)
            },
          },
            h('input', {
              ref: inputRef,
              className: 'ffish-input',
              value: input,
              placeholder: t('ui.placeholder'),
              maxLength: 300,
              'aria-label': t('ui.placeholder'),
              onChange: (event) => setInput(event.target.value),
            }),
            asrSupported ? h('button', {
              type: 'button',
              className: `ffish-mic ${listening ? 'listening' : ''}`,
              title: listening ? t('ui.listening') : t('ui.mic'),
              'aria-label': listening ? t('ui.listening') : t('ui.mic'),
              'aria-pressed': listening,
              onClick: () => { if (listening) stopListening(); else startListening() },
              disabled: typing,
            }, h(Icon, { name: 'mic', size: 17 })) : null,
            h('button', {
              type: 'submit',
              className: 'ffish-send',
              title: t('ui.send'),
              'aria-label': t('ui.send'),
              disabled: typing || !input.trim(),
            }, h(Icon, { name: 'send', size: 17, strokeWidth: 2 })),
          ),

          h('footer', { className: 'ffish-chat-foot' },
            h('span', null, t('ui.footHint')),
            h('span', { className: 'ffish-bond' }, h(Icon, { name: 'heart', size: 12 }), affinityText),
          ),
        ) : null,

        toast ? h('div', {
          key: `toast-${toast.key}`,
          className: 'ffish-toast',
          role: 'status',
          'aria-live': 'polite',
        }, toast.text) : null,

        helpOffer ? h('div', { key: 'help-offer', className: 'ffish-help-offer' },
          h('span', { className: 'ffish-help-portrait', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
          h('div', { className: 'ffish-help-body' },
            h('span', { className: 'ffish-help-title' }, '要帮忙吗？'),
            h('span', { className: 'ffish-help-task' }, `「${helpOffer.task}」`),
          ),
          h('button', { type: 'button', className: 'ffish-help-btn yes', style: { background: '#4d6bfe', color: '#ffffff' }, onClick: acceptHelp }, '好呀'),
          h('button', { type: 'button', className: 'ffish-help-btn no', onClick: declineHelp }, '不用'),
        ) : null,

        lockActive ? h('div', { key: 'lock', className: 'ffish-lock' },
          h('div', { className: 'ffish-lock-card' },
            h('div', { className: 'ffish-lock-portrait', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
            h('div', { className: 'ffish-lock-title' }, '……你又要走吗？'),
            h('p', { className: 'ffish-lock-text' }, '大肥鱼把屏幕挡住了。说一句「对不起」或者「我喜欢你」，她就消气。'),
            h('input', {
              className: 'ffish-lock-input',
              value: lockText,
              placeholder: '说点什么…',
              maxLength: 60,
              onChange: (event) => setLockText(event.target.value),
              onKeyDown: (event) => {
                if (event.key !== 'Enter') return
                event.preventDefault()
                unlockScreen(/对不起|抱歉|sorry|喜欢你|我错了|在的/i.test(lockText))
              },
            }),
            h('div', { className: 'ffish-lock-actions' },
              h('button', {
                type: 'button',
                className: 'ffish-lock-btn primary',
                onClick: () => unlockScreen(/对不起|抱歉|sorry|喜欢你|我错了|在的/i.test(lockText)),
              }, '提交'),
              h('button', {
                type: 'button',
                className: 'ffish-lock-btn ghost',
                onClick: () => unlockScreen(false),
              }, '冷静一下'),
            ),
            h('div', { className: 'ffish-lock-hint' }, '（90 秒后也会自动让开）'),
          ),
        ) : null,

        personaOpen ? h('div', { key: 'persona', className: 'ffish-persona' },
          h('div', { className: 'ffish-persona-card' },
            h('div', { className: 'ffish-persona-title' }, '你想让大肥鱼成为怎样的她？'),
            h('div', { className: 'ffish-persona-sub' }, '初始好感度 60。性格决定她生气、撒娇、吃醋和帮你的方式，之后还会随相处慢慢变化。'),
            h('div', { className: 'ffish-persona-grid' },
              PERSONA_KEYS.map((key) => {
                const persona = PERSONAS[key]
                return h('button', {
                  key,
                  type: 'button',
                  className: 'ffish-persona-option',
                  onClick: () => choosePersona(key),
                },
                  h('span', { className: 'ffish-persona-name' }, persona.label),
                  h('span', { className: 'ffish-persona-desc' }, persona.desc),
                  persona.warn ? h('span', { className: 'ffish-persona-warn' }, `⚠ ${persona.warn}`) : null,
                )
              }),
            ),
            h('div', { className: 'ffish-persona-custom' },
              h('label', null, '也可以直接用一句话微调她的性格（会写进她的人设）'),
              h('input', {
                value: personaText,
                maxLength: 120,
                placeholder: '例：表面毒舌但私下很温柔，喜欢在我写代码时安静趴着',
                onChange: (event) => setPersonaText(event.target.value),
                onKeyDown: (event) => {
                  if (event.key !== 'Enter') return
                  event.preventDefault()
                  saveCustomPersona()
                },
              }),
              h('button', { type: 'button', className: 'ffish-persona-save', style: { background: '#4d6bfe', color: '#ffffff' }, onClick: saveCustomPersona }, '保存这个性格'),
            ),
          ),
        ) : null,
      )
    }

    // ---------------------------------------------------------------------
    // Bootstrap state (defined after the component for hoisting clarity)
    // ---------------------------------------------------------------------

    function loadBootstrap() {
      const defaults = {
        name: ZH_TEXT['name.petDefault'],
        userName: ZH_TEXT['name.userDefault'],
        stats: { hunger: 76, energy: 84, happiness: 74, affinity: 34 },
        wander: true,
        quiet: false,
        voice: false,
        zoom: 1,
        soul: makeSoul(null),
        pos: null,
        messages: [],
      }
      let saved = null
      try {
        const raw = localStorage.getItem(STORE_KEY)
        if (raw) saved = JSON.parse(raw)
      } catch (error) { saved = null }

      const viewportWidth = Math.max(320, window.innerWidth || 1280)
      const viewportHeight = Math.max(320, window.innerHeight || 800)
      const fallbackPos = {
        x: Math.max(16, viewportWidth - SIZE - 96),
        y: Math.max(MIN_Y, viewportHeight - SIZE - 180),
      }

      if (!saved || saved.v !== 1) {
        return { ...defaults, pos: fallbackPos, elapsedHours: 0 }
      }

      const stats = {
        hunger: Number.isFinite(saved.stats && saved.stats.hunger) ? roundStat(saved.stats.hunger) : defaults.stats.hunger,
        energy: Number.isFinite(saved.stats && saved.stats.energy) ? roundStat(saved.stats.energy) : defaults.stats.energy,
        happiness: Number.isFinite(saved.stats && saved.stats.happiness) ? roundStat(saved.stats.happiness) : defaults.stats.happiness,
        affinity: Number.isFinite(saved.stats && saved.stats.affinity) ? roundStat(saved.stats.affinity) : defaults.stats.affinity,
      }
      const elapsedHours = clamp((Date.now() - (Number(saved.updatedAt) || Date.now())) / 3600000, 0, 72)
      if (elapsedHours > 0.08) {
        const decay = Math.min(elapsedHours, 24)
        stats.hunger = clamp(stats.hunger - decay * 1.9, 6, 100)
        stats.energy = clamp(stats.energy - decay * 1.5, 6, 100)
        stats.happiness = clamp(stats.happiness - decay * 1.1, 6, 100)
      }
      const x = Number(saved.x)
      const y = Number(saved.y)
      return {
        name: typeof saved.name === 'string' && saved.name.trim() ? saved.name.trim().slice(0, 10) : defaults.name,
        userName: typeof saved.userName === 'string' && saved.userName.trim() ? saved.userName.trim().slice(0, 10) : defaults.userName,
        stats,
        wander: saved.wander !== false,
        quiet: saved.quiet === true,
        voice: saved.voice === true,
        pos: {
          x: Number.isFinite(x) ? clamp(x, 6, viewportWidth - SIZE - 6) : fallbackPos.x,
          y: Number.isFinite(y) ? clamp(y, MIN_Y, viewportHeight - SIZE - 8) : fallbackPos.y,
        },
        messages: sanitizeStoredMessages(saved.messages),
        zoom: clamp(Number(saved.zoom) || 1, 0.62, 1.4),
        soul: makeSoul(saved.soul),
        elapsedHours,
      }
    }

    const UI_CSS = __FFISH_UI_CSS__

    return {
      inject: ['slots'],
      apply(ctx) {
        const locale = ctx.get('locale')
        let translate = null
        if (locale && typeof locale.register === 'function') {
          ctx.effect(() => locale.register('fatfish-pet', 'zh', ZH_TEXT), 'fatfish-pet locale zh')
          ctx.effect(() => locale.register('fatfish-pet', 'en', EN_TEXT), 'fatfish-pet locale en')
          translate = (key) => {
            try { return locale.bind('fatfish-pet')(key) } catch (error) { return null }
          }
        }
        const t = (key) => {
          const fromLocale = translate ? translate(key) : null
          if (fromLocale && fromLocale !== key) return fromLocale
          return ZH_TEXT[key] || EN_TEXT[key] || key
        }
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'fatfish-pet',
          order: -20,
          label: () => t('meta.title'),
        }, (slotProps) => h(PetRoot, Object.assign({}, slotProps, { t, locale }))))
      },
    }
  },
})
