'''@author AJWuu'''

import jieba
import collections
import re
from pyecharts.charts import WordCloud
from pyecharts.globals import SymbolType
from pyecharts import options as opts
from pyecharts.globals import ThemeType


def remove_useless_words(seg_list_exact):
    result_list = []
    with open('stop_words.txt', encoding='utf-8') as f:
        con = f.readlines()
        stop_words = set()
        for i in con:
            # delete every "\n"
            i = i.replace("\n", "")
            stop_words.add(i)
    for word in seg_list_exact:
        # delete stop words
        if word not in stop_words and len(word) > 1:
            result_list.append(word)
    return result_list


def render_cloud(word_counts_top100):
    word1 = WordCloud(init_opts=opts.InitOpts(width='1350px', height='750px', theme=ThemeType.MACARONS))
    word1.add('Frequency', data_pair=word_counts_top100, word_size_range=[15, 108], textstyle_opts=opts.TextStyleOpts(font_family='cursive'), shape=SymbolType.DIAMOND)
    word1.set_global_opts(title_opts=opts.TitleOpts('Comment Cloud'), toolbox_opts=opts.ToolboxOpts(is_show=True, orient='vertical'), tooltip_opts=opts.TooltipOpts(is_show=True, background_color='red', border_color='yellow'))
    word1.render("CommentCloud.html")


if __name__ == '__main__':
    with open('content.txt', encoding='utf-8') as f:
        data = f.read()

    new_data = re.findall('[\u4e00-\u9fa5]+', data, re.S)
    new_data = " ".join(new_data)
    
    # jieba -- chop a sentence into phrases
    seg_list_exact = jieba.cut(new_data, cut_all=True)
    
    final_list = remove_useless_words(seg_list_exact)
    word_counts = collections.Counter(final_list)
    word_counts_top100 = word_counts.most_common(100)
    # print(word_counts_top100)
    render_cloud(word_counts_top100)
